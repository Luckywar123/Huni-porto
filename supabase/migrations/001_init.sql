-- HUNI: jalankan sekali di Supabase > SQL Editor
create extension if not exists btree_gist;

-- ========== PROFIL & ROLE ==========
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz default now()
);

create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)));
  return new;
end $$;

create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

-- ========== KOST / KONTRAKAN ==========
create table public.properties (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('kost','kontrakan')),
  address text,
  created_at timestamptz default now()
);

create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  name text not null,
  price_monthly numeric(12,2) not null,
  status text not null default 'available' check (status in ('available','occupied','maintenance')),
  photos text[] not null default '{}'
);

create table public.rentals (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id),
  tenant_id uuid not null references public.profiles(id),
  start_date date not null,
  end_date date,
  status text not null default 'active' check (status in ('active','ended'))
);

-- ========== FUTSAL ==========
create table public.futsal_fields (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price_per_hour numeric(12,2) not null
);

create table public.futsal_bookings (
  id uuid primary key default gen_random_uuid(),
  field_id uuid not null references public.futsal_fields(id),
  user_id uuid references public.profiles(id),
  customer_name text not null,
  phone text,
  start_time timestamptz not null,
  end_time timestamptz not null,
  total_price numeric(12,2) not null default 0,
  status text not null default 'pending' check (status in ('pending','paid','cancelled')),
  created_at timestamptz default now(),
  check (end_time > start_time),
  -- anti double booking di level database
  exclude using gist (field_id with =, tstzrange(start_time, end_time) with &&) where (status <> 'cancelled')
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  ref_type text not null check (ref_type in ('rental','futsal')),
  ref_id uuid not null,
  amount numeric(12,2) not null,
  status text not null default 'pending',
  paid_at timestamptz
);

-- ========== KEAMANAN ==========
-- Semua akses data lewat Java API (koneksi owner, bypass RLS).
-- RLS aktif tanpa policy = akses langsung via anon key ke tabel diblok.
alter table public.profiles        enable row level security;
alter table public.properties      enable row level security;
alter table public.rooms           enable row level security;
alter table public.rentals         enable row level security;
alter table public.futsal_fields   enable row level security;
alter table public.futsal_bookings enable row level security;
alter table public.payments        enable row level security;

-- ========== STORAGE (upload gambar) ==========
-- Bucket public (baca bebas), upload hanya lewat API pakai service key.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
  ('avatars',     'avatars',     true, 5242880, array['image/jpeg','image/png','image/webp']),
  ('room-photos', 'room-photos', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

-- ========== JADIKAN DIRIMU ADMIN (setelah daftar akun) ==========
-- update public.profiles set role = 'admin' where id = (select id from auth.users where email = 'emailmu@example.com');
