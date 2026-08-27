create extension if not exists "pgcrypto";
create table if not exists public.gifts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'Casa',
  description text not null default '',
  image_url text,
  purchase_url text,
  claimed_by_name text,
  claimed_by_phone text,
  claimed_at timestamptz,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  response text not null check (response in ('sim','nao')),
  created_at timestamptz not null default now()
);
alter table public.gifts enable row level security;
alter table public.rsvps enable row level security;
create or replace function public.claim_gift(gift_id uuid,guest_name text,guest_phone text)
returns boolean language plpgsql security definer set search_path=public as $$
declare changed integer;
begin
  update gifts set claimed_by_name=guest_name,claimed_by_phone=guest_phone,claimed_at=now()
  where id=gift_id and active=true and claimed_by_name is null;
  get diagnostics changed=row_count;
  return changed=1;
end;$$;
revoke all on function public.claim_gift(uuid,text,text) from public,anon,authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('gift-images','gift-images',true,6291456,array['image/jpeg','image/png','image/webp','image/avif'])
on conflict(id) do update set public=true,file_size_limit=6291456,allowed_mime_types=excluded.allowed_mime_types;

insert into public.gifts(name,category,description) values
('Jogo de toalhas','Banheiro','Para deixar o nosso cantinho ainda mais aconchegante'),
('Jogo de copos','Cozinha','Para brindar os bons momentos da casa nova'),
('Kit de utensílios','Cozinha','Itens úteis para o dia a dia'),
('Almofadas decorativas','Sala','Um toque de conforto para o novo lar'),
('Jogo de cama','Quarto','Para noites tranquilas no nosso novo começo'),
('Potes organizadores','Organização','Para uma casa bonita e organizada');
