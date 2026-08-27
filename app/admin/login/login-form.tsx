"use client";

import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

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
