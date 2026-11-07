-- Run once in Supabase SQL Editor. Safe to rerun; existing data is preserved.
create table if not exists public.admins (
 user_id uuid primary key references auth.users(id) on delete cascade
);
create table if not exists public.shop_settings (
 id integer primary key check (id = 1),
 name text not null default 'CHẠM',
 tagline text not null default 'Một chút cà phê. Một chút thảnh thơi.',
 address text not null default 'Đang cập nhật địa chỉ',
 phone text not null default '',
 hours text not null default 'Đang cập nhật giờ mở cửa'
);
-- Run in Supabase SQL Editor. Existing shop data and RLS remain unchanged.
-- Adding the column sets this shop's Page for existing and new settings rows.
alter table public.shop_settings
  add column if not exists messenger_url text not null default 'https://m.me/HarveyJettt';

insert into public.shop_settings (id) values (1) on conflict do nothing;
create table if not exists public.products (
 id uuid primary key default gen_random_uuid(),
 name text not null check (char_length(name) between 1 and 120),
 description text not null default '' check (char_length(description) <= 500),
 price integer not null check (price between 0 and 100000000),
 image_url text not null default '' check (image_url = '' or image_url ~ '^https://'),
 category text not null check (category in ('coffee','icecream','snacks')),
 available boolean not null default true,
 sort_order integer not null default 0 check (sort_order >= 0),
 created_at timestamptz not null default now()
);
alter table public.admins enable row level security;
alter table public.shop_settings enable row level security;
alter table public.products enable row level security;
drop policy if exists "Read own admin membership" on public.admins;
create policy "Read own admin membership" on public.admins for select to authenticated using (user_id = (select auth.uid()));
drop policy if exists "Public shop information" on public.shop_settings;
create policy "Public shop information" on public.shop_settings for select to anon, authenticated using (true);
drop policy if exists "Public menu" on public.products;
create policy "Public menu" on public.products for select to anon, authenticated using (true);
drop policy if exists "Admins manage shop" on public.shop_settings;
create policy "Admins manage shop" on public.shop_settings for update to authenticated using (exists(select 1 from public.admins where user_id = (select auth.uid()))) with check (exists(select 1 from public.admins where user_id = (select auth.uid())));
drop policy if exists "Admins manage products" on public.products;
create policy "Admins manage products" on public.products for all to authenticated using (exists(select 1 from public.admins where user_id = (select auth.uid()))) with check (exists(select 1 from public.admins where user_id = (select auth.uid())));
grant select on public.products, public.shop_settings to anon, authenticated;
grant select on public.admins to authenticated;
grant insert,update,delete on public.products to authenticated;
grant update on public.shop_settings to authenticated;
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
 values ('product-images','product-images',true,5242880,array['image/jpeg','image/png','image/webp','image/avif']) on conflict (id) do nothing;
drop policy if exists "Public product images" on storage.objects;
create policy "Public product images" on storage.objects for select to anon,authenticated using (bucket_id = 'product-images');
drop policy if exists "Admins upload product images" on storage.objects;
create policy "Admins upload product images" on storage.objects for insert to authenticated with check (bucket_id = 'product-images' and exists(select 1 from public.admins where user_id = (select auth.uid())));
-- Create a user in Authentication > Users, then grant access using its UUID:
-- insert into public.admins (user_id) values ('ADMIN_USER_UUID') on conflict do nothing;
