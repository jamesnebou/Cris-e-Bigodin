# Chá de Casa Nova — Filipe & Cristine

Sistema responsivo com convite, lista de presentes, reserva atômica de itens, confirmação de presença e painel administrativo protegido por link mágico no e-mail.

## Configuração

1. Crie um projeto no Supabase.
2. Abra **SQL Editor**, cole e execute `supabase/schema.sql`.
3. Em **Authentication > URL Configuration**, adicione a URL de produção e `https://SEU-DOMINIO/auth/callback` nas URLs permitidas.
4. Importe este repositório na Vercel.
5. Cadastre na Vercel as variáveis de `.env.example` com os valores do Supabase.
6. Faça o deploy.

## Links

- `/` — convite e lista de presentes
- `/confirmar-presenca` — confirmação de presença
- `/admin` — painel administrativo

Administradores autorizados: `contato@nexawi.com.br` e `tinewest3@gmail.com`.

## Segurança

As chaves sensíveis ficam somente no servidor. A reserva usa uma função atômica no banco para impedir que duas pessoas escolham o mesmo presente. O painel valida a sessão e o e-mail também nas APIs administrativas.
