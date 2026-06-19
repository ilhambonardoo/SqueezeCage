# Arsitektur & Struktur Proyek

Dokumen ini menjelaskan tata letak folder, komponen utama, alur data, dan desain arsitektur aplikasi.

1. Ringkasan

- Next.js 16 (App Router) + TypeScript
- Prisma sebagai ORM untuk PostgreSQL
- NextAuth untuk autentikasi
- Tailwind CSS untuk styling
- Upload handling via `uploadthing` atau provider yang dikonfigurasi

2. Struktur folder (highlight)

- `app/` — Routes dan layout Next.js (App Router). Group routes untuk `(admin)`, `(auth)`, `(user)`.
- `components/` — Komponen UI terorganisir per fitur.
- `lib/` — Konfigurasi library (Prisma client, NextAuth types, helper utils).
- `services/` — Business logic dan server actions (fungsi yang memanggil Prisma).
- `hooks/` — Custom React hooks (useUser, useTernak, dsb).
- `interface/` — Definisi TypeScript interfaces.
- `prisma/` — Skema Prisma dan migrasi.

3. Model utama (ringkasan dari Prisma schema)

- `User`: id, name, email, role (`ADMIN`|`OPERATOR`), image, password/hash jika disimpan, createdAt, updatedAt
- `Ternak` / `Kambing`: kode_hewan, nama, jenis (kambing/domba), jenis_kelamin, umur, status_hamil (opsional), imageUrl, ownerId, createdAt, updatedAt
- `RiwayatBerat`: referensi ke `Ternak`, berat, tanggal, catatan

4. Autentikasi & Authorization

- NextAuth digunakan untuk session-based authentication.
- Role-based access: `ADMIN` untuk manajemen user, `OPERATOR` untuk manajemen ternak.
- API route dan server action harus memeriksa session/role.

5. Data flow (ringkas)

- Frontend memanggil API routes (under `app/api/*`) atau menggunakan Server Actions di Next.js.
- API routes memvalidasi input, memeriksa session, lalu memakai `services/*` untuk mengakses database melalui `lib/prisma`.
- Upload file: frontend mengunggah ke penyimpanan (mis. S3/UploadThing) lalu menyimpan URL di database.

6. Deployment considerations

- Environment variables harus disimpan di provider (Vercel/Render)
- Pastikan `NEXTAUTH_URL` dan `NEXTAUTH_SECRET` benar
- Gunakan managed Postgres di production; konfigurasi backup dan connection pooling

7. Observability

- Tambahkan logging di server actions dan API routes
- Gunakan error boundary di React dan toasts untuk notifikasi

8. Testing

- Unit test untuk services (Prisma calls) dan hooks
- Integration test untuk API routes (opsional)

9. Komponen penting & file entry

- Auth config: `auth.ts`
- Prisma client: `lib/prisma.ts`
- API routes: `src/app/api/*`
- Global layout: `src/app/layout.tsx`
