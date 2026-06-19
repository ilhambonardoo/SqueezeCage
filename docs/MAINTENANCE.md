# Maintenance & Operasional

Panduan pemeliharaan aplikasi setelah deployment.

1. Backup & Retention

- Pastikan backup harian untuk Postgres.
- Simpan snapshot sebelum menjalankan migrasi besar.

2. Migrasi Database

- Di environment staging: jalankan `npx prisma migrate dev` untuk menguji.
- Di production: jalankan `npx prisma migrate deploy`.

3. Seed & Data

- Gunakan `prisma/seed.ts` jika tersedia untuk environment dev/staging.

4. Rollback

- Jika migrasi gagal, rollback dengan snapshot DB atau revert migration lalu apply ulang.

5. Observability

- Error tracking (Sentry)
- Performance monitoring (NewRelic, Datadog)

6. Security

- Update dependency secara berkala
- Audit Prisma raw queries jika ada
- Batasi akses database hanya ke aplikasi dan admin

7. Routine

- Periksa logs bulanan
- Hapus file upload lama jika perlu (policy retention)
