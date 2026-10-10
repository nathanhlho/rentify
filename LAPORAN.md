# Laporan Proyek: Rentify (Aplikasi Sewa Barang)

**Nama / NIM:** ______________________
**Mata kuliah:** ______________________

## 1. Latar belakang dan studi kasus
Penyewaan barang seperti kamera, konsol game, dan perlengkapan camping masih sering dicatat manual sehingga stok dan status pesanan sulit dipantau. Rentify adalah aplikasi web satu akun (Jonatan, tanpa halaman login) dengan dua tab:
- **Disewakan:** katalog barang milik pengguna lain. Jonatan mencari, memfilter, memesan dengan tanggal sewa, memantau Pesanan Saya, dan bisa membatalkan pesanan.
- **Menyewakan:** barang milik Jonatan sendiri. Ia menambah, mengubah, dan menghapus barangnya, melihat dashboard, dan memproses Pesanan Masuk dari penyewa lain.

Setiap barang memiliki pemilik (`owner`). Barang milik Jonatan tidak tampil di katalog tab Disewakan.

Pengembangan dari contoh modul (MyShop): studi kasus berubah dari jual-beli menjadi sewa berbasis durasi, dengan alur status pesanan dan stok yang berkurang dan kembali otomatis.

## 2. Tech stack
| Komponen | Teknologi |
|---|---|
| Library UI | React 18 |
| Build tool | Vite 6 |
| Routing | React Router 7 (HashRouter, nested route, `Outlet`, `NavLink`) |
| State global | Context API |
| Ikon | lucide-react |
| Styling | CSS murni |
| Penyimpanan | localStorage (custom hook `useLocalStorage`) |
| Deployment | GitHub Pages / Vercel |

## 3. Struktur proyek
Mengikuti pola modul: `components/`, `context/`, `hooks/`, `data/`, `utils/`, `layouts/`, `pages/frontpages`, `pages/adminpages`.

## 4. Penerapan konsep React
| Konsep | Implementasi |
|---|---|
| **React Component** | `ProductCard`, `ProductImage`, `BookingModal`, `Sidebar`, `Topbar`, `ModeTabs`, `StatCard`, `OrderStatus`, `MainLayout`, dan halaman di `pages/` |
| **Passing Props** | `ProductCard` (`product`, `onRent`), `ProductImage` (`product`, `className`), `StatCard` (`label`, `value`, `note`, `icon`, `color`), `OrderStatus` (`status`), `BookingModal` (`product`, `onClose`, `onSubmit`), `Sidebar` (`mobileOpen`, `setMobileOpen`), `OrdersPage` (`admin`) |
| **Conditional Rendering** | Menu sidebar mengikuti tab aktif; tombol aksi pesanan bergantung pada status (pemilik: setujui, tolak, mulai sewa, selesai; penyewa: batalkan hanya saat Menunggu atau Disetujui); katalog menyembunyikan barang milik sendiri; empty state saat barang tidak ditemukan; tombol dan label "Habis" saat stok 0; kolom pencarian hanya tampil di katalog; pesan error form; modal hanya tampil saat ada barang terpilih; toast sementara; placeholder saat foto gagal dimuat |
| **useState** | `search`, `selectedProduct`, `mobileOpen` (MainLayout); `category` (katalog); form pemesanan dan form barang; filter status pesanan; `toast`; `gagal` pada `ProductImage` |
| **useContext** | `AuthContext` (akun pengguna, via `useAuth`), `RentalContext` (barang, pesanan, fungsi CRUD, via `useRental`), `ToastContext` (via `useToast`) |

Tambahan: custom hook `useLocalStorage`, `useNavigate`, `useLocation`, `useOutletContext`.

## 5. Alur utama
1. Pindah antara tab Disewakan dan Menyewakan lewat tab di bagian atas halaman.
2. Di tab Disewakan, Jonatan memilih barang milik pengguna lain, mengisi tanggal dan metode pembayaran, lalu total biaya dihitung otomatis.
3. Pesanan masuk berstatus Menunggu dan stok berkurang satu.
4. Di tab Menyewakan, Jonatan memproses pesanan masuk untuk barangnya (setujui atau tolak, lalu tandai Disewa dan Selesai). Penyewa bisa membatalkan pesanan yang masih Menunggu atau Disetujui. Stok kembali saat pesanan ditolak, dibatalkan, selesai, atau dihapus.

## 6. Bukti tangkapan layar
Simpan screenshot di folder `docs/` lalu sisipkan di sini.

| No | Tampilan | Konsep | File |
|---|---|---|---|
| 1 | Katalog penyewa | Component, Props | `docs/01-katalog.png` |
| 2 | Pencarian tanpa hasil | Conditional rendering | `docs/02-empty.png` |
| 3 | Modal pemesanan dengan total biaya dan pesan error | useState | `docs/03-booking.png` |
| 4 | Notifikasi pesanan berhasil | useContext (ToastContext) | `docs/04-toast.png` |
| 5 | Pesanan Saya dengan tombol Batalkan dan status Dibatalkan | Conditional rendering | `docs/05-pesanan.png` |
| 6 | Dashboard di tab Menyewakan | useContext (AuthContext) | `docs/06-admin.png` |
| 7 | Pesanan masuk dengan tombol aksi | Conditional rendering | `docs/07-admin-orders.png` |
| 8 | Barang Saya (tab Menyewakan) dan form edit | useState, Props | `docs/08-kelola.png` |
| 9 | Barang dengan stok habis | Conditional rendering | `docs/09-habis.png` |
| 10 | Tampilan ponsel | Responsif | `docs/10-mobile.png` |
| 11 | Aplikasi di URL publikasi (address bar terlihat) | Deployment | `docs/11-live.png` |

## 7. Kendala dan solusi
(Isi dengan pengalamanmu. Contoh: refresh halaman di GitHub Pages error 404, diatasi dengan HashRouter dan `base: './'`; foto yang gagal dimuat diatasi dengan placeholder di `ProductImage`.)

## 8. Kesimpulan
(Tulis 2-3 kalimat. Ide lanjutan: login sungguhan, database, pengecekan bentrok jadwal per tanggal.)

## 9. Tautan
- **URL aplikasi:** https://________________
- **Repositori GitHub:** https://github.com/________/rentify-react
- **Portofolio:** https://________________
