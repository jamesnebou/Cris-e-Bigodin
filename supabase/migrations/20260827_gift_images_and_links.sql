alter table public.gifts add column if not exists image_url text;
alter table public.gifts add column if not exists purchase_url text;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('gift-images','gift-images',true,6291456,array['image/jpeg','image/png','image/webp','image/avif'])
on conflict(id) do update set public=true,file_size_limit=6291456,allowed_mime_types=excluded.allowed_mime_types;
