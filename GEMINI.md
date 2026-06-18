# squeeze cage - Smart Livestock Monitoring System

squeeze cage adalah platform manajemen peternakan digital yang dirancang untuk memantau data kesehatan dan pertumbuhan hewan ternak (Kambing & Domba) secara real-time. Sistem ini memungkinkan peternak untuk mencatat riwayat berat badan, status kehamilan, dan detail informasi ternak lainnya dengan efisien.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16.2.2 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database & ORM**: [PostgreSQL](https://www.postgresql.org/) & [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/), [Lucide React](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Components**: [Swiper](https://swiperjs.com/), [React Hot Toast](https://react-hot-toast.com/)

---

## 📂 Struktur Folder

```text
├── prisma/                 # Konfigurasi Database & Schema
│   ├── schema.prisma       # Definisi model data (User, Kambing, RiwayatBerat)
│   └── migrations/         # Riwayat migrasi database
├── public/                 # Aset statis (Gambar, SVG, Uploads)
├── src/
│   ├── app/                # Next.js App Router (Routes & Pages)
│   │   ├── (admin)/        # Route Group untuk Panel Admin (Dashboard, User, Kambing)
│   │   ├── (auth)/         # Route Group untuk Login & Register
│   │   ├── api/            # Route API (Auth, Kambing, User, Upload)
│   │   └── layout.tsx      # Layout utama dengan providers
│   ├── components/         # UI Components terorganisir per fitur
│   │   ├── DashboardPage/   # Card info, Hero section dashboard
│   │   ├── KambingPage/     # CRUD Kambing components
│   │   ├── TimbanganPage/   # Visualisasi data berat badan
│   │   └── Layouts/         # Sidebar, Navbar
│   ├── services/           # Business logic & Server Actions (CRUD Operations)
│   ├── lib/                # Konfigurasi library (Prisma Client, NextAuth)
│   ├── hooks/              # Custom React Hooks
│   ├── interface/          # Definisi Type & Interface TypeScript
│   └── utils/              # Helper functions & context providers
├── auth.ts                 # Konfigurasi NextAuth
├── package.json            # Daftar dependensi & scripts
└── next.config.ts          # Konfigurasi Next.js
```

---

## 📊 Model Data (Prisma Schema)

Proyek ini memiliki 3 model utama:

1.  **User**: Mengelola akun pengguna dengan role `ADMIN` atau `OPERATOR`.
2.  **Kambing**: Data detail ternak termasuk kode unik, nama, jenis hewan (Kambing/Domba), jenis kelamin, umur, dan status kehamilan (khusus betina).
3.  **RiwayatBerat**: Log perubahan berat badan ternak untuk keperluan analisis pertumbuhan melalui chart.

---

## ✨ Fitur Utama

- **Dashboard Real-time**: Ringkasan jumlah ternak dan statistik pertumbuhan.
- **Manajemen Ternak**: CRUD (Create, Read, Update, Delete) data ternak dengan dukungan upload gambar.
- **Monitoring Berat**: Pencatatan riwayat berat badan dan visualisasi grafik menggunakan Recharts.
- **Manajemen Pengguna**: Admin dapat mengelola akun operator.
- **Responsif & Animasi**: UI modern menggunakan Tailwind CSS 4 dengan animasi halus dari GSAP dan Framer Motion.

---

## 🛠️ Instalasi & Pengembangan

1. **Clone Repository**

   ```bash
   git clone <repository-url>
   cd iotechquila
   ```

2. **Install Dependensi**

   ```bash
   npm install
   ```

3. **Konfigurasi Environment**
   Buat file `.env` dan atur:
   - `DATABASE_URL`: URL PostgreSQL.
   - `NEXTAUTH_SECRET`: Secret key untuk auth.
   - `NEXTAUTH_URL`: URL aplikasi (default: http://localhost:3000).

4. **Setup Database**

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Jalankan Aplikasi**
   ```bash
   npm run dev
   ```

---

## 🔌 API Endpoints (Ringkasan)

- `/api/auth/*`: Penanganan autentikasi (Login/Logout).
- `/api/kambing`: API untuk manajemen data ternak.
- `/api/users`: API untuk manajemen akun oleh admin.
- `/api/upload`: API untuk penanganan upload file gambar ke storage.

---

Dokumentasi ini dibuat untuk memudahkan pemahaman alur kerja dan struktur teknis proyek **squeeze cage**.
