# API Reference

Dokumentasi ringkas endpoint API yang tersedia di `src/app/api`.

Catatan: URL base untuk development `http://localhost:3000/api`.

1. Auth

- `POST /api/auth/*` — NextAuth routes (signin, signout, callback). Gunakan NextAuth client di frontend.

2. Users

- `GET /api/users` — (Admin) daftar user.
- `GET /api/users/:id` — detail user.
- `POST /api/users` — buat user baru (Admin).
- `PUT /api/users/:id` — update user.
- `DELETE /api/users/:id` — hapus user.

3. Ternak (Kambing)

- `GET /api/ternak` — daftar ternak (dengan pagination / filter).
- `GET /api/ternak/:id` — detail ternak.
- `POST /api/ternak` — buat ternak baru (operator/admin).
- `PUT /api/ternak/:id` — update data ternak.
- `DELETE /api/ternak/:id` — hapus ternak.

4. Riwayat Berat

- `GET /api/ternak/:id/riwayat` — daftar riwayat berat ternak.
- `POST /api/ternak/:id/riwayat` — tambah entry berat.

5. Upload

- `POST /api/uploadthing/*` atau route custom untuk meng-handle upload ke storage.

6. Kandang

- `GET /api/kandang`
- `POST /api/kandang`

7. Sekat

- `GET /api/sekat`
- `POST /api/sekat`

Contoh request (fetch):

```js
// ambil daftar ternak
fetch("/api/ternak", { method: "GET", credentials: "include" })
  .then((r) => r.json())
  .then((data) => console.log(data));
```

Autorisasi:

- Semua route yang sensitif memerlukan session (cek `getServerSession` atau helper NextAuth yang digunakan).

Validasi input:

- Gunakan validator (zod, yup) di level API/Server Action untuk memvalidasi body request.

Jika Anda ingin dokumentasi endpoint yang lebih lengkap (contoh body, response schema, contoh error), saya dapat membuat file OpenAPI/Swagger atau collection Postman/Insomnia.
