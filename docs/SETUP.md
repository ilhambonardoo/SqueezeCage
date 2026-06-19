# Setup & Pengembangan Lokal

Panduan ini menjelaskan langkah-langkah untuk menjalankan proyek secara lokal.

1. Persyaratan

- Node.js 18+ (direkomendasikan LTS)
- npm / pnpm / yarn
- PostgreSQL (atau gunakan layanan hosted)
- Git

2. Clone repository

```bash
git clone <repository-url>
cd <repo-folder>
```

3. Install dependensi

```bash
npm install
# atau
# pnpm install
# atau
# yarn
```

4. Konfigurasi environment
   Buat file `.env` di root proyek (salin dari `.env.example` jika ada). Variabel penting:

- `DATABASE_URL` — URL koneksi PostgreSQL (contoh: `postgresql://user:pass@localhost:5432/dbname`)
- `NEXTAUTH_SECRET` — Secret untuk NextAuth
- `NEXTAUTH_URL` — URL aplikasi (mis. `http://localhost:3000`)
- `UPLOADTHING_SECRET` / konfigurasi storage lain (jika digunakan)

5. Prisma: generate & migrate

```bash
npx prisma generate
npx prisma migrate dev
# jika ingin menjalankan seed:
npx prisma db seed
```

6. Menjalankan aplikasi

```bash
npm run dev
```

Aplikasi akan tersedia di `http://localhost:3000`.

7. Skrip penting

- `npm run build` — build untuk produksi
- `npm run start` — menjalankan build produksi
- `npm run format` — (jika ada) format code

8. Tips pengembangan

- Gunakan `.env.local` untuk override environment lokal.
- Gunakan `prisma studio` untuk melihat data: `npx prisma studio`.
- Untuk migrasi schema: buat perubahan di `prisma/schema.prisma` lalu `npx prisma migrate dev --name <descriptive-name>`.
