# Rentify

Aplikasi sewa barang dengan React 18, Vite, React Router, dan Context API. Data barang dan pesanan disimpan di localStorage.

## Menjalankan
```bash
npm install
npm run dev
```

## Struktur
```
src/
  components/   ProductCard, ProductImage, BookingModal, Sidebar, Topbar, StatCard, OrderStatus
  context/      AuthContext (akun pengguna), RentalContext (barang & pesanan), ToastContext (notifikasi)
  hooks/        useLocalStorage
  data/         seed.js (data awal)
  utils/        format.js
  layouts/      MainLayout
  pages/        frontpages/CatalogPage, OrdersPage, adminpages/AdminDashboard, AdminProducts
```

## Tab Menyewa dan Mengelola
Satu akun (Jonatan), tanpa login, dengan dua tab di bagian atas halaman.
- **Disewakan:** katalog barang milik pengguna lain yang bisa Jonatan sewa, dan Pesanan Saya (bisa dibatalkan).
- **Menyewakan:** barang milik Jonatan sendiri yang disewakan, dashboard, dan Pesanan Masuk dari orang yang menyewa barangnya. Barang di dua tab ini berbeda: setiap barang punya pemilik, dan barang milik sendiri tidak muncul di katalog.

## Publikasi
**GitHub Pages:** `npm run deploy`, lalu Settings > Pages > branch `gh-pages`.
**Vercel:** impor repo dari GitHub, preset Vite, Deploy.
Router memakai HashRouter sehingga refresh halaman aman di GitHub Pages.

## Mengganti foto barang
Admin > Kelola Barang > Edit > isi kolom URL gambar. Atau taruh file di `public/images/` lalu isi `/images/nama-file.jpg` (di GitHub Pages pakai `./images/nama-file.jpg`).
Kalau foto gagal dimuat, kartu menampilkan placeholder berisi nama barang.
