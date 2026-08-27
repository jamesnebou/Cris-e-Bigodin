"use client";

import { useEffect, useState } from "react";
import { completeBrowserAuth } from "@/lib/supabase/complete-browser-auth";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!window.location.hash.includes("access_token=")) return;
    setSending(true);
    setMessage("Validando seu acesso...");
    completeBrowserAuth()
      .then((completed) => {
        if (!completed) throw new Error("Sessão inválida");
        window.location.replace("/admin");
      })
      .catch(() => {
        window.history.replaceState({}, "", "/admin/login?error=invalid_link");
        setMessage("Este link é inválido ou expirou. Solicite um novo acesso.");
        setSending(false);
      });
  }, []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      setMessage(result.message ?? "Não foi possível enviar o link de acesso.");
    } catch {
      setMessage("Não foi possível conectar ao serviço de autenticação. Tente novamente.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="admin-form login-form" onSubmit={submit}>
      <label>
        E-mail
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="seu@email.com"
        />
      </label>
      {message ? <div className="notice" role="status">{message}</div> : null}
      <button disabled={sending}>
        {sending ? "Enviando..." : "Enviar link de acesso"}
      </button>
    </form>
  );
}
