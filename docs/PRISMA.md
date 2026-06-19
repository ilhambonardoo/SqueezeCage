# Prisma — Skema & Migrasi

Lokasi: `prisma/schema.prisma` dan folder migrasi `prisma/migrations/`.

Perintah umum:

- `npx prisma generate` — generate Prisma Client
- `npx prisma migrate dev --name <name>` — buat dan jalankan migrasi di dev
- `npx prisma migrate deploy` — jalankan migrasi di production
- `npx prisma studio` — buka UI data browser
- `npx prisma db seed` — jalankan seeder (jika tersedia)

Model utama (ringkasan)

- `User` — akun aplikasi (role: ADMIN|OPERATOR)
- `Ternak` (table_ternak) — informasi hewan
- `RiwayatBerat` — riwayat perubahan berat ternak

Tips migrasi

- Jangan commit kredensial ke git.
- Untuk perubahan besar di production, gunakan migration preview dan backup DB.

Melihat migrasi yang sudah ada:

- Inspect folder `prisma/migrations/*` untuk SQL migrasi

Jika ingin, saya dapat mengekstrak model lengkap dari `prisma/schema.prisma` dan menambahkan dokumentasi field per-field.

Lihat referensi schema lengkap: `docs/PRISMA_SCHEMA.md` untuk penjelasan model, field, relasi, enum, dan contoh query Prisma.
