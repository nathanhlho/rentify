import { Link, useLocation } from 'react-router-dom'

// Disewakan: barang milik orang lain yang bisa kamu sewa. Menyewakan: barang milikmu yang kamu sewakan.
export default function ModeTabs() {
  const { pathname } = useLocation()
  const menyewakan = pathname.startsWith('/menyewakan')
  return (
    <div className="role-toggle" role="tablist" aria-label="Pilih tab">
      <Link to="/" role="tab" aria-selected={!menyewakan} className={!menyewakan ? 'on' : ''}>Disewakan</Link>
      <Link to="/menyewakan/dashboard" role="tab" aria-selected={menyewakan} className={menyewakan ? 'on' : ''}>Menyewakan</Link>
    </div>
  )
}
