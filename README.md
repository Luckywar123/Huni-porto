# HUNI — Kost, Kontrakan & Futsal

Monorepo: **web** (React, di root repo) · **api** (Java Spring Boot) · **supabase** (SQL).
Web dan app Android sama-sama konsumsi REST API yang sama.

```
React web ──┐
            ├─► Java REST API ─► Supabase (Postgres + Auth + Storage)
Android  ───┘
```

## 1. Database (Supabase)
1. Buat project di Supabase.
2. Buka **SQL Editor**, jalankan `supabase/migrations/001_init.sql`.
3. Daftar akun lewat web, lalu jadikan admin (SQL Editor):
   ```sql
   update public.profiles set role = 'admin'
   where id = (select id from auth.users where email = 'emailmu@example.com');
   ```

## 2. API
```bash
cd api
cp .env.example .env   # isi DB_*, SUPABASE_URL, SUPABASE_SERVICE_KEY
export $(grep -v '^#' .env | xargs)
mvn spring-boot:run    # http://localhost:8080
```
- Auth: JWT Supabase diverifikasi lewat JWKS (default project baru). Project lama (HS256) perlu ganti ke `NimbusJwtDecoder.withSecretKey`.
- Role (`user` / `admin`) dibaca dari tabel `profiles`. `/api/admin/**` hanya admin.
- Upload gambar (avatar, foto kamar) lewat API, disimpan di Supabase Storage bucket `avatars` dan `room-photos`.
- `SUPABASE_SERVICE_KEY` rahasia, jangan pernah dipakai di web/Android.
- Pakai **session pooler** (port 5432) atau direct connection. Transaction pooler (6543) perlu `?prepareThreshold=0`.
- Deploy: `api/Dockerfile` (Railway / Render / VPS).

## 3. Web
```bash
cp .env.example .env   # VITE_API_URL, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
npm install
npm run dev            # http://localhost:5173
```
Deploy ke Vercel: Root Directory dikosongkan (root repo), set 3 env var di atas, lalu Redeploy.

## Endpoint
| Method | Path | Akses |
|---|---|---|
| GET | `/api/public/properties`, `/rooms`, `/futsal/fields`, `/futsal/fields/{id}/busy?date=` | publik |
| GET/PUT | `/api/me` | login |
| POST | `/api/me/avatar` (multipart `file`) | login |
| GET/POST | `/api/me/bookings` | login |
| CRUD | `/api/admin/properties`, `/rooms`, `/futsal/fields` | admin |
| POST/DELETE | `/api/admin/rooms/{id}/photos` | admin |
| GET/PATCH | `/api/admin/futsal/bookings`, `/users/{id}/role`, `/stats` | admin |

## Belum ada (next)
- Endpoint `rentals` & `payments` (tabel sudah ada di DB)
- Payment gateway (Midtrans / Xendit)
- Android app (Kotlin + Retrofit, atau React Native), tinggal pakai API yang sama
- Modul cafe / POS
