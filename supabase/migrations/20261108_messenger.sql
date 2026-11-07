-- Run in Supabase SQL Editor. Existing shop data and RLS remain unchanged.
-- Adding the column sets this shop's Page for existing and new settings rows.
alter table public.shop_settings
  add column if not exists messenger_url text not null default 'https://m.me/HarveyJettt';
