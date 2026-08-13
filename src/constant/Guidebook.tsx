"use client";

import React from "react";
import {
  Cpu,
  Layers,
  Settings,
  Smartphone,
  LayoutDashboard,
  Wrench,
  AlertTriangle,
  HeartHandshake,
  ShieldPlus,
} from "lucide-react";

export interface Tab {
  id: number;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  content: React.ReactNode;
}

export const tabs: Tab[] = [
  {
    id: 1,
    label: "Komponen Utama Perangkat",
    icon: Cpu,
    title: "BAB 1 : Komponen Utama Perangkat",
    content: (
      <>
        <p className="text-slate-600 text-sm leading-relaxed pb-5">
          Sebelum mengoperasikan alat, pastikan Anda mengenali komponen-komponen
          utama Berikut:
        </p>
        <ol
          className="space-y-3 text-slate-600 text-sm leading-relaxed list-decimal pl-5"
          type="1"
        >
          <li>
            <strong>Rangka Kandang Utama : </strong> Terbuat dari besi hollow
            dan plat bordes anti-slip yang kokoh untuk menahan beban dan
            pergerakan ternak
          </li>
          <li>
            <strong>Sensor Beban (Load Cell) : </strong> Terdapat 4 titik sensor
            presisi tinggi di bagian bawah alas kandang yang bertugas membaca
            berat ternak.
          </li>
          <li>
            <strong>Konsol / Box Kontrol Utama : </strong> Modul elektronik (3D
            Printed Box) yang bersifat detachable (bisa dilepas-pasang). Di
            dalamnya terdapat mikrokontroler (ESP32) sebagai{" "}
            <strong>otak</strong> pengolah data.
          </li>
          <li>
            <strong>Layar LCD : </strong>Berada di panel depan box kontrol untuk
            menampilkan antarmuka menu, indikator bobot, dan status koneksi
            secara real-time.
          </li>
          <li>
            <strong>Panel Tombol Fisik : </strong> Tombol navigasi interaktif
            untuk mengoperasikan perangkat, meliputi:
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>
                <strong>Tombol POWER :</strong> Terletak di bagian bawah konsol,
                berfungsi untuk menghidupkan dan mematikan perangkat.
              </li>
              <li>
                <strong>Tombol UP dan DOWN : </strong> Berfungsi untuk
                menggulir, menavigasi, atau memilih menu fitur pada layar LCD.
              </li>
              <li>
                <strong>Tombol OK : </strong> Berfungsi untuk mengonfirmasi
                pilihan atau masuk ke dalam fitur tertentu.
              </li>
              <li>
                <strong>Tombol BACK : </strong> Berfungsi untuk membatalkan
                pilihan atau kembali ke tampilan menu sebelumnya.
              </li>
            </ul>
          </li>
          <li>
            <strong>Fitur Konsol (Perangkat Lunak) : </strong> Sistem pada box
            kontrol ini dilengkapi dengan berbagai fitur fungsional, yaitu:
            <ul className="list-disc pl-5 mt-1 space-y-2">
              <li>
                <strong>Fitur Lock : </strong> Berfungsi untuk mengunci angka
                timbangan jika ternak banyak bergerak di dalam kandang, sehingga
                operator tetap mendapatkan hasil pembacaan yang stabil.
              </li>
              <li>
                <strong>Fitur Zero (Tare) : </strong> Berfungsi untuk
                mengembalikan (kalibrasi) nilai timbangan kembali ke angka 0.
                Sangat berguna untuk menghilangkan hitungan berat sisa kotoran
                yang menempel di lantai kandang.
              </li>
              <li>
                <strong>Satuan Kg/Lbs : </strong> Memungkinkan operator mengubah
                unit satuan berat sesuai standar yang dibutuhkan (Kilogram atau
                Pound).
              </li>
              <li>
                <strong>Mode Tampilan (Gelap/Terang) : </strong> Fitur untuk
                menyesuaikan tema dan kontras layar LCD agar angka tetap terbaca
                dengan nyaman, baik saat di bawah terik matahari maupun di malam
                hari.
              </li>
              <li>
                <strong>Factory Diagnostic Mode : </strong> Fitur diagnostik
                khusus yang menampilkan nilai pembacaan asli (<em>raw data</em>)
                dari masing-masing sensor Load Cell. Fitur ini sangat berguna
                untuk proses pemeliharaan seperti pengecekan kesehatan dan
                akurasi tiap sensor secara mandiri.
              </li>
            </ul>
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 2,
    label: "Petunjuk Keselamatan",
    icon: ShieldPlus,
    title: "BAB 2 : Petunjuk Keselamatan (Safety Instructions)",
    content: (
      <>
        <p className="text-slate-600 text-sm leading-relaxed pb-5">
          Mohon perhatikan instruksi berikut demi keselamatan operator dan
          keawetan perangkat:
        </p>
        <ul className="space-y-4 text-slate-600 text-sm leading-relaxed list-disc pl-5">
          <li>
            <strong className="text-rose-600">
              Bahaya Air (Korsleting) :{" "}
            </strong>{" "}
            Jauhkan Box Kontrol Elektronik, sensor Load Cell di bagian bawah
            alas, serta bagian ujung kabel Load Cell dari cipratan atau genangan
            air secara langsung. Jangan mencuci area box kontrol atau menyemprot
            bagian sensor dan soket kabel dengan selang bertekanan air tinggi.
          </li>
          <li>
            <strong className="text-amber-600">Batas Kapasitas Beban : </strong>{" "}
            Jangan memasukkan beban atau ternak yang melebihi kapasitas maksimal
            sensor, yaitu <strong>200 Kg</strong>. Beban berlebih yang melampaui
            batas ini dapat menyebabkan kerusakan permanen pada pelat Load Cell.
          </li>
          <li>
            <strong>Permukaan Tanah : </strong> Operasikan alat hanya pada
            permukaan tanah, semen, atau lantai yang rata, keras, dan tidak
            bergelombang agar pembacaan berat tidak bias atau meleset.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 3,
    label: "Persiapan dan Perakitan",
    icon: Layers,
    title: "BAB 3 : Persiapan dan Perakitan (Assembly)",
    content: (
      <>
        <p className="text-slate-600 text-sm leading-relaxed pb-5">
          Bagian ini menjelaskan cara merakit dan menyiapkan kandang di lokasi
          peternakan.
        </p>
        <ol className="space-y-4 text-slate-600 text-sm leading-relaxed list-decimal pl-5">
          <li>
            <strong>Posisikan Kandang : </strong> Letakkan Smart Squeeze Cage di
            atas permukaan yang rata dan stabil. Pastikan tidak ada batu atau
            benda yang mengganjal di bawah pelat timbangan.
          </li>
          <li>
            <strong>Penempatan Box Kontrol (Opsional) : </strong> Ambil box
            kontrol utama dan pasangkan pada dudukan/pengait yang telah
            disediakan di sisi samping luar rangka besi kandang.
            <span className="block mt-1 text-xs text-slate-500 italic">
              <strong>Catatan : </strong> Pemasangan pada rangka ini bersifat
              opsional. Jika dikhawatirkan pergerakan hewan ternak terlalu
              agresif dan berisiko membentur atau merusak perangkat, maka box
              kontrol tidak perlu dikaitkan pada rangka dan cukup dipegang
              secara aman oleh operator selama proses penimbangan berlangsung.
            </span>
          </li>
          <li>
            <strong>Sambungkan Kabel Sensor : </strong> Hubungkan kabel utama
            dari 2 sensor Load Cell di bawah kandang ke port konektor yang
            tersedia di bagian bawah box kontrol. Harap perhatikan bahwa
            terdapat dua jenis warna pada konektor kabel, yaitu hitam dan putih.
            Lakukan pemasangan dengan mencocokkan warnanya, konektor hitam ke
            port warna hitam, dan konektor putih ke port warna putih. Pastikan
            kabel terpasang dengan rapat.
            <span className="block mt-1 text-xs text-slate-500 italic">
              <strong>Catatan : </strong> Jika box kontrol sedang dipegang oleh
              operator, pastikan jarak berdiri tidak terlalu jauh agar kabel
              sensor tidak tertarik kencang atau terputus.
            </span>
          </li>
          <li>
            <strong>Pengisian dan Penyambungan Sumber Daya : </strong> Perangkat
            konsol ini menggunakan baterai internal. Karena layar tidak
            menampilkan persentase kapasitas baterai, harap perhatikan panduan
            manajemen daya berikut :
            <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-600">
              <li>
                <strong>Pengisian Daya (Charging) : </strong> Sangat disarankan
                untuk selalu mengisi daya perangkat sebelum dibawa dan digunakan
                di lapangan. Gunakan kabel charger tipe-C (Type-C). Untuk
                pengisian yang lebih optimal, disarankan menggunakan adaptor
                fast charging 67 Watt.
              </li>
              <li>
                <strong>Lampu Indikator Baterai : </strong> Status pengisian
                daya dapat dipantau melalui lampu indikator kecil yang
                memancarkan cahaya dari dalam celah lubang port charger
                (Tipe-C). Jika cahaya dari dalam lubang berwarna Merah, berarti
                baterai sedang dalam proses pengisian. Jika cahaya berubah
                menjadi Biru, berarti baterai sudah terisi penuh dan perangkat
                siap digunakan.
              </li>
              <li>
                <strong>Tanda Baterai Lemah / Habis : </strong> Jika daya
                baterai menipis atau habis, perangkat akan menunjukkan gejala
                seperti : layar LCD meredup, layar macet (stuck) dan hanya
                menampilkan warna putih, atau perangkat tidak mau menyala sama
                sekali. Jika hal ini terjadi, segera lakukan pengisian daya.
              </li>
            </ul>
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 4,
    label: "Mengaktifkan Jaringan Internet",
    icon: Settings,
    title: "BAB 4 : Mengaktifkan Jaringan Internet (Hotspot Mandiri)",
    content: (
      <>
        <p className="text-slate-600 text-sm leading-relaxed pb-5">
          Karena alat ini berbasis IoT, perangkat membutuhkan internet untuk
          mengirim data ke Dashboard Web.
        </p>
        <ol className="space-y-4 text-slate-600 text-sm leading-relaxed list-decimal pl-5">
          <li>
            <strong>Buka Pengaturan HP : </strong> Buka menu Pengaturan
            (Settings) pada smartphone operator.
          </li>
          <li>
            <strong>Nyalakan Hotspot : </strong> Masuk ke menu Hotspot Portabel
            / Personal Hotspot dan aktifkan.
          </li>
          <li>
            <strong>Sesuaikan Kredensial : </strong>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600">
              <li>
                Ubah Nama Jaringan (SSID) menjadi :{" "}
                <code className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-mono font-bold">
                  TNK
                </code>
              </li>
              <li>
                Ubah Kata Sandi (Password) menjadi :{" "}
                <code className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-mono font-bold">
                  dombagemuk
                </code>
              </li>
            </ul>
            <span className="block mt-1 text-xs text-slate-500 italic">
              <strong>Catatan : </strong> Langkah ini hanya perlu dilakukan saat
              pertama kali penggunaan. Setelahnya, alat akan otomatis terhubung
              jika Hotspot dinyalakan.
            </span>
          </li>
          <li>
            <strong>Siapkan Koneksi : </strong> Pastikan kuota internet pada HP
            operator tersedia dan sinyal seluler stabil.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 5,
    label: "Mengoperasikan Konsol Perangkat",
    icon: Smartphone,
    title: "BAB 5 : Mengoperasikan Konsol Perangkat",
    content: (
      <>
        <p className="text-slate-600 text-sm leading-relaxed pb-5">
          Setelah perangkat menyala dan terhubung ke jaringan internet, Anda
          dapat mulai mengoperasikan menu pada layar LCD menggunakan panel
          tombol fisik yang tersedia.
        </p>
        <ol className="space-y-6 text-slate-600 text-sm leading-relaxed list-decimal pl-5">
          <li>
            <strong>Menyalakan Alat & Tampilan Awal : </strong>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-600">
              <li>Tekan tombol POWER yang terletak di bagian bawah konsol.</li>
              <li>
                Layar LCD akan menyala. Tunggu beberapa detik hingga perangkat
                selesai mencari sinyal WiFi. Jika berhasil, layar akan
                menampilkan tulisan &ldquo;Terkoneksi&rdquo; dan indikator bobot
                &ldquo;0.00 Kg&rdquo;.
              </li>
              <li>
                Layar LCD akan menyala and menampilkan antarmuka utama
                &ldquo;SQUEEZE CAGE&rdquo;. Pada sisi kiri layar, Anda akan
                melihat panel REALTIME MONITOR yang menampilkan angka bobot
                secara langsung. Di sisi kanan layar, terdapat 4 kotak menu
                fitur utama.
              </li>
            </ul>
          </li>

          <li>
            <strong>Cara Navigasi (Memilih Menu) : </strong> Pengoperasian
            konsol ini sangat mudah dan interaktif. Gunakan keempat tombol di
            sebelah kanan layar untuk bernavigasi :
            <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-600">
              <li>
                <strong>Tombol UP (Atas) & DOWN (Bawah) : </strong> Tekan tombol
                kuning ini untuk menggulir dan menyorot pilihan dari 4 fitur
                utama yang ada di panel kanan layar.
              </li>
              <li>
                <strong>Tombol OK : </strong> Tekan tombol ini untuk memilih
                (mengonfirmasi) fitur yang sedang disorot.
              </li>
              <li>
                <strong>Tombol BACK : </strong> Tekan tombol ini untuk
                membatalkan perintah atau kembali ke tampilan sebelumnya.
              </li>
            </ul>
          </li>

          <li>
            <strong>Menggunakan 4 Fitur Utama : </strong> Saat ternak akan
            ditimbang, Anda dapat mencoba dan mengoperasikan keempat fitur utama
            berikut sesuai kondisi di lapangan :
            <ul className="list-disc pl-5 mt-2 space-y-3 text-slate-600">
              <li>
                <strong>Fitur ZERO (Kalibrasi Nol) : </strong> Jika saat kandang
                kosong layar menunjukkan angka selain 0 (misalnya karena ada
                tumpukan kotoran / sisa pakan), arahkan sorotan ke menu ZERO,
                lalu tekan OK. Angka timbangan akan kembali ter-reset menjadi
                0.00.
              </li>
              <li>
                <strong>Fitur LOCK (Kunci Bobot) : </strong> Jika hewan ternak
                terus berontak di dalam kandang sehingga angka timbangan
                naik-turun, arahkan sorotan ke menu LOCK, lalu tekan OK. Sistem
                akan mengunci dan membekukan angka bobot rata-rata agar mudah
                dicatat.
              </li>
              <li>
                <strong>Fitur Satuan (KG / LBS) : </strong> Arahkan sorotan ke
                menu satuan (misal : KG), lalu tekan OK untuk mengubah format
                satuan berat dari Kilogram (Kg) menjadi Pound (Lbs), atau
                sebaliknya.
              </li>
              <li>
                <strong>Fitur Mode Terang / Gelap : </strong> Arahkan sorotan ke
                box menu keempat (paling bawah), lalu tekan OK untuk mengubah
                tema kontras layar. Sesuaikan mode ini agar layar tetap nyaman
                dibaca, baik saat terik matahari siang maupun malam hari.
              </li>
            </ul>
          </li>

          <li>
            <strong>Fitur Factory Diagnostic Mode : </strong> Mode ini adalah
            fitur perawatan teknis (maintenance) yang berfungsi untuk
            menampilkan nilai pembacaan beban asli (raw data) dari keempat
            sensor Load Cell secara terpisah. Fitur ini sangat berguna untuk
            mengecek apakah ada sensor yang rusak atau kendor.
            <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-600">
              <li>
                <strong>Cara Mengakses : </strong> Tekan dan tahan tombol OK dan
                tombol BACK secara bersamaan selama 3 detik.
              </li>
              <li>
                Layar akan beralih ke halaman Diagnostik. Setelah selesai
                melakukan pengecekan, tekan tombol BACK untuk keluar dan kembali
                ke halaman Realtime Monitor.
              </li>
            </ul>
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 6,
    label: "Penggunaan Dashboard Web & Fitur AI",
    icon: LayoutDashboard,
    title: "BAB 6 : Penggunaan Dashboard Web & Fitur AI",
    content: (
      <>
        <p className="text-slate-600 text-sm leading-relaxed pb-5">
          Sistem Dashboard Web berfungsi sebagai pusat kendali untuk memantau
          data, merekapitulasi riwayat penimbangan, serta memberikan analisis
          prediktif.
        </p>
        <ol className="space-y-6 text-slate-600 text-sm leading-relaxed list-decimal pl-5">
          <li>
            <strong>Akses Sistem dan Login Akun : </strong>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-600">
              <li>
                Buka aplikasi browser di smartphone atau komputer, lalu akses
                tautan : (https://squeeze-cage.vercel.app/).
              </li>
              <li>
                <strong>Catatan Akun : </strong> Akun operator hanya dapat
                ditambahkan oleh Admin utama demi menjaga keamanan data
                peternakan. Jika Anda adalah operator baru dan membutuhkan
                akses, silakan meminta pembuatan akun dengan menghubungi tim
                pengembang melalui{" "}
                <a
                  href="https://wa.me/6285389371126"
                  className="hover:text-black underline hover:font-semibold"
                  target="_blank"
                >
                  kontak
                </a>{" "}
                yang tertera di bagian akhir (Penutup) buku panduan ini.
              </li>
              <li>
                Gunakan Username dan Password yang telah diberikan untuk masuk
                ke dalam sistem. Anda dapat melihat dan mengatur informasi akun
                Anda melalui menu Profil di panel sebelah kiri.
              </li>
            </ul>
          </li>

          <li>
            <strong>Menu Dashboard (Beranda Utama) : </strong>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-600">
              <li>
                Saat pertama kali masuk, Anda akan diarahkan ke halaman
                Dashboard.
              </li>
              <li>
                Halaman ini menampilkan kesimpulan keseluruhan data peternakan,
                jumlah total ternak, serta grafik tren rata-rata berat hewan
                ternak dari waktu ke waktu berdasarkan hasil pemeriksaan.
              </li>
            </ul>
          </li>

          <li>
            <strong>Menu Timbangan (Real-Time Monitoring) : </strong>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-600">
              <li>
                Fitur ini memiliki fungsi yang sama seperti layar LCD pada box
                konsol di lapangan.
              </li>
              <li>
                Pilih menu Timbangan untuk melihat angka berat badan ternak yang
                sedang berada di atas alat secara real-time langsung dari
                pembacaan sensor Load Cell.
              </li>
            </ul>
          </li>

          <li>
            <strong>Manajemen Area (Tambah Kandang dan Sekat) : </strong>{" "}
            Sebelum mendaftarkan hewan, pastikan Anda telah mendata area
            peternakan terlebih dahulu :
            <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-600">
              <li>
                Pilih menu Ternak, lalu klik Tambah Kandang dan Sekat. Fitur ini
                memungkinkan operator untuk menyesuaikan data digital dengan
                kondisi nyata di lapangan sesuai program peternakan.
              </li>
              <li>
                <strong>Tambah Kandang : </strong> Gunakan untuk membuat data
                bangunan/gedung utama kandang.
              </li>
              <li>
                <strong>Tambah Sekat : </strong> Gunakan untuk membuat batas
                ruangan atau petak di dalam gedung kandang tersebut (misal :
                Sekat Individu atau Sekat Koloni).
              </li>
            </ul>
          </li>

          <li>
            <strong>Manajemen Data Ternak : </strong>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-600">
              <li>
                <strong>Tambah Ternak : </strong> Buka menu ini untuk
                mendaftarkan hewan baru.
              </li>
              <li>
                Isi &ldquo;Kode Hewan&rdquo; sesuai dengan nomor Tag pada
                telinga ternak. Jika tidak ada, kode bisa disesuaikan.
              </li>
              <li>
                <strong>Unggah Foto : </strong> Sangat disarankan untuk
                menambahkan foto ternak agar mudah dikenali, terutama jika tidak
                ada Tag telinga atau untuk melihat perubahan fisik saat dewasa.
              </li>
              <li>
                <strong>Input Berat Awal & Akhir : </strong> Anda tidak perlu
                mengetik manual. Cukup klik tombol Ambil dari Timbangan yang ada
                di atas form untuk menarik angka secara real-time dari alat
                ukur.
              </li>
              <li>
                Pilih &ldquo;Lokasi Bangunan Kandang&rdquo; dan &ldquo;Nomor
                Sekat&rdquo; tempat hewan tersebut dipelihara.
              </li>
              <li>
                <strong>Daftar Ternak : </strong> Buka menu ini untuk melihat
                seluruh data domba dan kambing yang telah terdaftar di sistem.
                Anda dapat meninjau, mengedit (Edit), atau menghapus (Delete)
                data jika terjadi perubahan.
              </li>
            </ul>
          </li>

          <li>
            <strong>
              Fitur Prediksi Kecerdasan Buatan (Machine Learning) :{" "}
            </strong>{" "}
            Sistem ini dilengkapi dengan algoritma Machine Learning (Random
            Forest Regression) untuk membantu manajemen peternakan.
            <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-600">
              <li>
                <strong>Prediksi Bobot : </strong> Pilih menu Prediksi &gt;
                Prediksi Bobot. Pilih ID/Kode ternak dari daftar yang sudah ada.
                Sistem akan memproyeksikan apakah bobot hewan tersebut tergolong
                ideal dan memprediksi target berat di bulan depan.
              </li>
              <li>
                <strong>Prediksi Pakan : </strong> Pilih menu Prediksi &gt;
                Prediksi Pakan. Pilih lokasi Kandang dan Sekat
                (individu/koloni). Sistem akan menghitung secara otomatis total
                akumulasi kebutuhan pakan Hijauan dan Konsentrat untuk area
                sekat tersebut, sehingga operator tidak perlu repot menghitung
                manual.
              </li>
            </ul>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-xl mt-3 text-xs text-slate-600">
              <strong>⚠️ PEMBERITAHUAN PENTING (DISCLAIMER) : </strong> Saat
              ini, hasil perhitungan dari fitur Prediksi AI (Machine Learning)
              masih dalam tahap pengembangan dan belum sepenuhnya akurat. Hal
              ini dikarenakan model kecerdasan buatan masih dilatih menggunakan
              data simulasi (dummy data). Akurasi sistem akan terus meningkat
              seiring dengan bertambahnya data nyata hasil penimbangan yang
              diinputkan secara rutin.
            </div>
          </li>
        </ol>
      </>
    ),
  },

  {
    id: 7,
    label: "Perawatan & Pemeliharaan Alat (Maintenance)",
    icon: Wrench,
    title: "BAB 7 : Perawatan & Pemeliharaan Alat (Maintenance)",
    content: (
      <>
        <p className="text-slate-600 text-sm leading-relaxed pb-5">
          Untuk menjaga keawetan dan tingkat akurasi alat (98.7%), lakukan
          perawatan rutin berikut:
        </p>
        <ul className="space-y-4 text-slate-600 text-sm leading-relaxed list-disc pl-5">
          <li>
            <strong>Pembersihan Berkala : </strong> Sapu dan bersihkan kotoran
            hewan (feses) yang menumpuk di atas plat bordes setiap selesai sesi
            penimbangan.
          </li>
          <li>
            <strong>Perawatan Sensor : </strong> Secara berkala, periksa kolong
            kandang. Bersihkan jaring laba-laba, lumpur, atau batu yang mungkin
            menyangkut di area 2 titik Load Cell.
          </li>
          <li>
            <strong>Penyimpanan Komponen Elektrik : </strong> Jika kandang
            sedang tidak digunakan dalam waktu lama atau berada di ruang terbuka
            saat hujan, lepas Box Kontrol (Konsol) dan simpan di ruangan kering
            dan aman bersuhu ruangan.
          </li>
          <li>
            <strong>Integritas Kabel : </strong> Pastikan kabel tidak terinjak
            oleh hewan ternak atau terjepit engsel pintu kandang.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 8,
    label: "Pemecahan Masalah (Troubleshooting)",
    icon: AlertTriangle,
    title: "BAB 8 : Pemecahan Masalah (Troubleshooting)",
    content: (
      <>
        <div className="w-full overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-sm text-left text-slate-600 min-w-[600px]">
            <thead className="text-xs uppercase bg-slate-100 text-slate-700 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-bold w-1/4">Gejala / Masalah</th>
                <th className="px-4 py-3 font-bold w-1/4">
                  Kemungkinan Penyebab
                </th>
                <th className="px-4 py-3 font-bold w-2/4">Solusi & Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50/50">
                <td className="px-4 py-4 font-semibold text-slate-800 vertical-top">
                  Alat tidak mau menyala (Layar LCD mati)
                </td>
                <td className="px-4 py-4">
                  Kabel daya tidak terpasang atau sumber tegangan kosong.
                </td>
                <td className="px-4 py-4">
                  Periksa sambungan adaptor/baterai ke port daya. Pastikan
                  baterai terisi penuh.
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="px-4 py-4 font-semibold text-slate-800 vertical-top">
                  Angka di layar tidak stabil / tidak wajar saat kosong
                </td>
                <td className="px-4 py-4">
                  Permukaan tanah miring, atau ada kotoran menumpuk di alas
                  timbangan.
                </td>
                <td className="px-4 py-4">
                  Pindahkan alat ke lantai datar. Tekan tombol TARE untuk
                  kalibrasi ulang menjadi 0.00 Kg.
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="px-4 py-4 font-semibold text-slate-800 vertical-top">
                  Data tidak terkirim ke Dashboard Web
                </td>
                <td className="px-4 py-4">
                  Koneksi internet terputus atau pengaturan SSID salah.
                </td>
                <td className="px-4 py-4">
                  Pastikan Hotspot HP aktif, kuota internet tersedia, dan
                  SSID/Password tepat persis tanpa ada spasi tambahan (typo).
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="px-4 py-4 font-semibold text-slate-800 vertical-top">
                  Error / &ldquo;No Connection&rdquo; di Layar LCD
                </td>
                <td className="px-4 py-4">
                  Modul ESP32 gagal menjangkau sinyal WiFi.
                </td>
                <td className="px-4 py-4">
                  Dekatkan smartphone yang menjadi sumber Hotspot ke arah Box
                  Kontrol (jarak optimal &lt; 5 meter). Matikan dan nyalakan
                  ulang alat (Restart).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },

  {
    id: 9,
    label: "Layanan Bantuan (Customer Support)",
    icon: HeartHandshake,
    title: "BAB 9 : Layanan Bantuan (Customer Support)",
    content: (
      <>
        <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
          <p>
            Terima kasih telah mempercayakan operasional penimbangan ternak Anda
            menggunakan Smart Squeeze Cage V1.0. Kami merancang inovasi ini
            dengan dedikasi penuh untuk membantu mempermudah pekerjaan fisik
            peternak, memastikan kesejahteraan hewan (animal welfare), serta
            mendorong terwujudnya ekosistem Precision Livestock Farming di
            Indonesia.
          </p>

          <p>
            Kami menyadari bahwa inovasi ini akan terus berkembang dan
            disempurnakan. Oleh karena itu, pengalaman, masukan, serta saran
            dari Bapak/Ibu sebagai mitra pengguna di lapangan sangatlah berharga
            bagi kami.
          </p>

          <p>
            Apabila Bapak/Ibu ataupun operator mengalami kendala teknis lebih
            lanjut yang tidak tercantum pada buku panduan ini, atau membutuhkan
            panduan perbaikan komponen (maintenance support), jangan ragu untuk
            menghubungi tim teknis pengembang kami melalui saluran komunikasi
            berikut :
          </p>

          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              <strong>Tim Teknis (WhatsApp) : </strong> 0853-8937-1126 - Ghina
              Rania
            </li>
            <li>
              <strong>Email Dukungan : </strong> ghiinarania@apps.ipb.ac.id
            </li>
            <li>
              <strong>Program Studi : </strong> Teknologi Rekayasa Komputer,
              Sekolah Vokasi IPB University
            </li>
            <li>
              <strong>Alamat : </strong> Kampus Sekolah Vokasi IPB University,
              Bogor, Jawa Barat.
            </li>
          </ul>

          <p>
            Semoga inovasi Smart Squeeze Cage ini dapat membawa manfaat,
            efisiensi waktu, and peningkatan produktivitas yang nyata bagi usaha
            peternakan Bapak/Ibu.
          </p>

          <div className="pt-4 border-t border-slate-100 text-slate-500">
            <p className="font-semibold text-slate-700">
              Selamat bertugas dan salam inovasi!
            </p>
            <p className="mt-1 text-xs italic">
              Hormat kami, Tim Pengembang Kelompok 14 IoT Teknologi Rekayasa
              Komputer angkatan 60 Sekolah Vokasi IPB University
            </p>
          </div>
        </div>
      </>
    ),
  },
];
