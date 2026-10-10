import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, ClipboardList, ShoppingBag } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useRental } from '../context/RentalContext'

const menuMenyewakan = [
  { to: '/menyewakan/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/menyewakan/barang', label: 'Barang Saya', icon: Package },
  { to: '/menyewakan/pesanan', label: 'Pesanan Masuk', icon: ClipboardList },
]
const menuDisewakan = [
  { to: '/', label: 'Jelajahi Barang', icon: ShoppingBag, end: true },
  { to: '/orders', label: 'Pesanan Saya', icon: ClipboardList },
]

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const { user } = useAuth()
  const { orders } = useRental()
  const { pathname } = useLocation()
  const waiting = orders.filter((o) => o.status === 'Menunggu').length
  const links = pathname.startsWith('/menyewakan') ? menuMenyewakan : menuDisewakan

  return (
    <>
      {mobileOpen && <button className="mobile-overlay" onClick={() => setMobileOpen(false)} aria-label="Tutup menu" />}
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand"><div className="brand-mark"><Package size={21} /></div><span>rentify<span className="brand-dot">.</span></span></div>
        <nav className="side-nav">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setMobileOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Icon size={18} /><span>{label}</span>
              {to === '/menyewakan/pesanan' && waiting > 0 && <span className="nav-count">{waiting}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="profile-row">
            <div className="profile-avatar">{user.initials}</div>
            <div className="profile-text"><strong>{user.name}</strong><span>Penyewa dan pemilik</span></div>
          </div>
        </div>
      </aside>
    </>
  )
}
