import { NextRequest, NextResponse } from "next/server";
import { ADMIN_EMAILS, createSupabaseAdmin } from "@/lib/supabase/admin";

function errorMessage(code?: string, message?: string) {
  if (code === "over_email_send_rate_limit") {
    return "O limite de e-mails foi atingido. Aguarde alguns minutos ou verifique o SMTP do Supabase.";
  }
  if (message?.toLowerCase().includes("not authorized")) {
    return "O provedor padrão do Supabase não permite enviar para este endereço. Configure um SMTP personalizado.";
  }
  return "O Supabase não conseguiu enviar o e-mail. Verifique o SMTP em Authentication > Emails e consulte os Auth Logs.";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!ADMIN_EMAILS.includes(email)) {
      return NextResponse.json(
        { message: "Este e-mail não está autorizado a acessar o painel." },
        { status: 403 },
      );
    }

    const redirectTo = new URL("/auth/callback", request.url).toString();
    const { error } = await createSupabaseAdmin().auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });

    if (error) {
      console.error("Falha ao enviar magic link", {
        code: error.code,
        status: error.status,
        message: error.message,
      });
      return NextResponse.json(
        { message: errorMessage(error.code, error.message) },
        { status: error.status || 500 },
      );
    }

    return NextResponse.json({
      message: "Link enviado! Verifique a caixa de entrada e também a pasta de spam.",
    });
  } catch (error) {
    console.error("Erro inesperado no envio do magic link", error);
    return NextResponse.json(
      { message: "Não foi possível enviar o link agora. Tente novamente em alguns instantes." },
      { status: 500 },
    );
  }
}
