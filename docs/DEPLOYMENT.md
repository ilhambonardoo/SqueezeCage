# Deployment

Panduan singkat untuk deployment aplikasi Next.js ke environment produksi (contoh: Vercel).

1. Vercel (direkomendasikan)

- Buat project di Vercel dan hubungkan repository.
- Atur environment variables di Vercel:
  - `DATABASE_URL`
  - `NEXTAUTH_URL`
  - `NEXTAUTH_SECRET`
  - variabel upload/keys lain (S3, UploadThing)
- Build command: `npm run build`
- Output directory: Next.js App Router otomatis

2. Database

- Gunakan managed Postgres (Supabase, Neon, ElephantSQL, Heroku Postgres)
- Jalankan migrasi di deployment pipeline: `npx prisma migrate deploy`

3. Secrets & storage

- Jaga secret di penyimpanan aman (Vercel Secrets atau env variables)
- Untuk file upload, konfigurasi provider (S3, DigitalOcean Spaces, atau UploadThing)

4. Monitoring & rollback

- Aktifkan logging/monitoring (Sentry, Logflare)
- Backup database sebelum migrasi besar

5. Alternatif deployment

- Docker + Kubernetes: buat Dockerfile untuk aplikasi dan jalankan container
- Platform lain: Render, Fly, Railway

Jika Anda ingin, saya bisa menambahkan contoh `vercel.json` atau konfigurasi Dockerfile untuk deployment.
