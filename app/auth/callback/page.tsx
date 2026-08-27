"use client";

import { useEffect, useState } from "react";
import { completeBrowserAuth } from "@/lib/supabase/complete-browser-auth";

export default function AuthCallbackPage() {
  const [message, setMessage] = useState("Validando seu acesso seguro...");

  useEffect(() => {
    completeBrowserAuth()
      .then((completed) => {
        if (!completed) throw new Error("Link de acesso inválido.");
        window.location.replace("/admin");
      })
      .catch(() => {
        setMessage("Este link é inválido ou expirou. Solicite um novo acesso.");
        window.setTimeout(() => window.location.replace("/admin/login?error=invalid_link"), 1800);
      });
  }, []);

  return (
    <main className="login-page">
      <section className="login-card auth-callback-card">
        <p className="kicker">Área reservada</p>
        <h1>Acessando o painel</h1>
        <p>{message}</p>
        <div className="auth-loader" aria-hidden="true" />
      </section>
    </main>
  );
}
