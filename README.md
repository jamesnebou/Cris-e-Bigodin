# Chá de Casa Nova — Filipe & Cristine

Sistema responsivo com convite, lista de presentes, reserva atômica de itens, confirmação de presença e painel administrativo protegido por link mágico no e-mail.

## Configuração

1. Crie um projeto no Supabase.
2. Abra **SQL Editor**, cole e execute `supabase/schema.sql`.
3. Em **Authentication > URL Configuration**, adicione a URL de produção e `https://SEU-DOMINIO/auth/callback` nas URLs permitidas.
4. Importe este repositório na Vercel.
5. Cadastre na Vercel as variáveis de `.env.example` com os valores do Supabase.
6. Faça o deploy.

## Atualização para imagens e links de compra

Se o banco já foi criado com uma versão anterior, abra o **SQL Editor** do Supabase e execute `supabase/migrations/20260827_gift_images_and_links.sql` uma única vez. Essa migração adiciona a foto do presente, o link privado de compra e o bucket usado pelo upload direto do painel.

No painel, a foto pode ser enviada em JPEG, PNG, WebP ou AVIF com até 6 MB. O endereço da loja permanece fora da listagem pública; o convidado vê apenas o botão **Pode olhar aqui!**.

## Links

- `/` — convite e lista de presentes
- `/confirmar-presenca` — confirmação de presença por link separado, sem acesso visível na página pública; deve ser enviado manualmente aos convidados
- `/admin` — painel administrativo

Administradores autorizados: `contato@nexawi.com.br` e `tinewest3@gmail.com`.

## Segurança

As chaves sensíveis ficam somente no servidor. A reserva usa uma função atômica no banco para impedir que duas pessoas escolham o mesmo presente. O painel valida a sessão e o e-mail também nas APIs administrativas.
