import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { data } = await createSupabaseAdmin()
    .from("gifts")
    .select("purchase_url")
    .eq("id", id)
    .eq("active", true)
    .maybeSingle();

  try {
    if (!data?.purchase_url) throw new Error("Link não informado");
    const destination = new URL(data.purchase_url);
    if (!["http:", "https:"].includes(destination.protocol)) {
      throw new Error("Protocolo inválido");
    }
    return NextResponse.redirect(destination);
  } catch {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
