# Investasi UMKM — frontend

Aplikasi Vue berbasis Nuxt 2 untuk menemukan kampanye UMKM, membuat kampanye, dan melihat transaksi investasi.

## Menjalankan project

Gunakan Node.js yang kompatibel dengan Nuxt 2, lalu jalankan:

```sh
npm install
cp .env.example .env
npm run dev
```

Atur `API_BASE_URL` pada `.env` sesuai alamat backend. Build produksi tersedia lewat `npm run build`; pemeriksaan direktori dapat dijalankan dengan `npm run check:structure`.

## Struktur project

Project ini tetap pada Nuxt 2 karena routing, Vuex, dan modul autentikasi yang dipakai masih terikat pada versi tersebut. Source code dikelompokkan di `app/` melalui opsi `srcDir`; Nuxt 2 mendukung konfigurasi ini. Aset publik ada di `public/` dan dipetakan lewat `dir.static`, sehingga URL aset tetap berbentuk `/nama-file`.

```text
app/assets/       CSS dan file yang diproses oleh Webpack
app/components/   Komponen antarmuka yang dapat dipakai ulang
app/constants/    Konfigurasi tetap, endpoint, dan nilai aplikasi
app/layouts/      Kerangka halaman
app/middleware/   Pemeriksaan akses route
app/pages/        Halaman dan route otomatis Nuxt
app/plugins/      Integrasi Axios dan plugin Nuxt
app/services/     Lapisan akses API yang dapat dipakai ulang
app/store/        Modul Vuex Nuxt 2
app/utils/        Formatter dan validator murni
public/           Gambar, ikon, dan aset yang diakses langsung dari URL
```

`public/` mempertahankan nama URL lama, jadi referensi seperti `/logo.svg` tidak perlu diubah. Nuxt 2 sudah mencapai akhir masa dukungan; migrasi Nuxt dan modul autentikasi/Vuex perlu dijadwalkan sebagai pekerjaan terpisah agar perilaku aplikasi bisa diuji menyeluruh. [Pengumuman EOL Nuxt 2](https://nuxt.com/blog/nuxt2-eol?s=09).
