import { useLocation } from 'react-router-dom'
import { Search, Menu } from 'lucide-react'
import ModeTabs from './ModeTabs'

const titles = {
  '/': ['Jelajahi barang', 'Barang dari pemilik lain yang bisa kamu sewa.'],
  '/orders': ['Pesanan saya', 'Barang yang kamu sewa. Bisa dibatalkan selama belum disewa.'],
  '/menyewakan/dashboard': ['Dashboard', 'Ringkasan barang yang kamu sewakan.'],
  '/menyewakan/barang': ['Barang saya', 'Atur barang milikmu yang disewakan.'],
  '/menyewakan/pesanan': ['Pesanan masuk', 'Pesanan dari orang yang menyewa barangmu.'],
}

export default function Topbar({ search, setSearch, setMobileOpen }) {
  const { pathname } = useLocation()
  const [title, subtitle] = titles[pathname] || titles['/']

  return (
    <header className="topbar">
      <button className="mobile-menu plain-icon" onClick={() => setMobileOpen(true)} aria-label="Buka menu"><Menu size={21} /></button>
      <div className="page-heading"><h1>{title}</h1><p>{subtitle}</p></div>
      <div className="top-actions">
        {pathname === '/' && (
          <label className="top-search"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari barang..." /></label>
        )}
        <ModeTabs />
      </div>
    </header>
  )
}
