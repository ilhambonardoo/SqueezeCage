# Prisma Schema Reference

Dokumentasi field-per-field berdasarkan `prisma/schema.prisma`.

## Model: User

- `id: String` — primary key, `@default(cuid())`.
- `nama: String` — varchar(255).
- `email: String` — unique.
- `password: String` — hashed password.
- `role: Role` — enum (`ADMIN` | `OPERATOR`), default `OPERATOR`.
- `createdAt: DateTime` — default `now()`.
- `updatedAt: DateTime` — `@updatedAt`.
- `username: String` — unique handle.
- `image: String?` — optional URL or key.
- `ternakList: Ternak[]` — relation to `Ternak` (one-to-many).

Notes:

- `email` dan `username` diberi constraint unik untuk menghindari duplikasi.
- Untuk autentikasi via NextAuth, `email` dan `password` digunakan jika strategi credentials disimpan.

## Model: Ternak

- `id: String` — primary key, `@default(cuid())`.
- `userId: String?` — foreign key ke `User` (nullable).
- `kode_hewan: String` — unique identifier per hewan.
- `nama: String` — nama hewan.
- `beratAwal: Float` — berat awal (kg).
- `jenis_kelamin: JenisKelamin?` — enum `JANTAN`|`BETINA`.
- `tgl_lahir: DateTime?` — tanggal lahir (opsional).
- `tgl_masuk: DateTime` — default `now()`.
- `createdAt: DateTime` — default `now()`.
- `updatedAt: DateTime` — `@updatedAt`.
- `beratAkhir: Float` — berat terakhir tercatat.
- `statusHamil: StatusKehamilan?` — enum `HAMIL`|`TIDAK_HAMIL`.
- `umur: Int` — umur (dalam hari atau bulan, sesuaikan aplikasi).
- `jenis_hewan: JenisHewan` — enum `DOMBA`|`KAMBING`.
- `sekatId: String?` — foreign key ke `Sekat`.
- `sekat: Sekat?` — relation ke `Sekat` (onDelete: SetNull).
- `programTernak: ProgramTernak?` — enum `FATTENING`|`BREEDING`.
- `imageKey: String?` — kunci file di storage.
- `imageUrl: String?` — URL gambar yang dapat diakses.
- `user: User?` — relation ke `User`.
- `riwayatBerat: RiwayatBerat[]` — relation one-to-many ke `RiwayatBerat`.

Notes:

- `kode_hewan` unik, gunakan pola yang konsisten (mis. `KMB-YYYY-XXXX`).
- `sekat` menggunakan `onDelete: SetNull` sehingga saat `Sekat` dihapus, `sekatId` dibersihkan.

## Model: Sekat

- `id: String` — primary key, `@default(cuid())`.
- `kodeSekat: String` — unique.
- `keteranganSekat: KeteranganSekat` — enum `INDIVIDU`|`KOLONI`, default `INDIVIDU`.
- `kandangId: String` — foreign key ke `Kandang`.
- `kandang: Kandang` — relation ke `Kandang` (onDelete: Cascade).
- `ternakList: Ternak[]` — hewan yang berada di sekat ini.
- `createdAt: DateTime` — default `now()`.
- `updatedAt: DateTime` — `@updatedAt`.

Notes:

- `onDelete: Cascade` pada `kandang` berarti saat `Kandang` dihapus, `Sekat` terkait juga dihapus.

## Model: Kandang

- `id: String` — primary key, `@default(cuid())`.
- `nama: String` — unique.
- `createdAt: DateTime` — default `now()`.
- `updatedAt: DateTime` — `@updatedAt`.
- `sekatList: Sekat[]` — relation one-to-many ke `Sekat`.

Notes:

- Gunakan `nama` yang deskriptif agar mudah dikelola di UI.

## Model: RiwayatBerat

- `id: String` — primary key, `@default(cuid())`.
- `berat: Float` — berat yang dicatat.
- `ternakId: String` — foreign key ke `Ternak`.
- `tgl_cek: DateTime` — tanggal cek, default `now()`.
- `createdAt: DateTime` — default `now()`.
- `ternak: Ternak` — relation ke `Ternak` (onDelete: Cascade).

Notes:

- `onDelete: Cascade` berarti saat `Ternak` dihapus, riwayat berat akan ikut terhapus.

## Enums

- `Role`: `ADMIN`, `OPERATOR`.
- `JenisKelamin`: `JANTAN`, `BETINA`.
- `StatusKehamilan`: `HAMIL`, `TIDAK_HAMIL`.
- `JenisHewan`: `DOMBA`, `KAMBING`.
- `ProgramTernak`: `FATTENING`, `BREEDING`.
- `KeteranganSekat`: `INDIVIDU`, `KOLONI`.

## Contoh query Prisma (TypeScript)

- Ambil semua ternak dengan riwayat berat:

```ts
const all = await prisma.ternak.findMany({
  include: { riwayatBerat: true, user: true, sekat: true },
});
```

- Tambah riwayat berat baru:

```ts
const entry = await prisma.riwayatBerat.create({
  data: { berat: 45.2, ternakId: "...id..." },
});
```

- Update status hamil:

```ts
await prisma.ternak.update({
  where: { id: "...id..." },
  data: { statusHamil: "HAMIL" },
});
```

## Catatan desain & rekomendasi

- Simpan file gambar menggunakan `imageKey` untuk integrasi storage (S3/UploadThing) dan `imageUrl` untuk URL publik.
- Pertimbangkan indexing pada kolom yang sering dicari (mis. `kode_hewan`, `userId`).
- Jika data besar, gunakan pagination pada query `findMany`.
