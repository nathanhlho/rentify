import { useNavigate } from 'react-router-dom'
import { CalendarDays, Package, ClipboardList, ArrowUpRight, Clock3 } from 'lucide-react'
import { rupiah, tanggalHariIni } from '../../utils/format'
import { useRental } from '../../context/RentalContext'
import { useAuth } from '../../context/AuthContext'
import StatCard from '../../components/StatCard'
import OrderStatus from '../../components/OrderStatus'
import ProductImage from '../../components/ProductImage'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { products: semuaBarang, orders: semuaPesanan } = useRental()
  const { user } = useAuth()
  const products = semuaBarang.filter(p => p.owner === user.name)
  const orders = semuaPesanan.filter(o => o.owner === user.name)
  const revenue = orders.filter(o => ['Disetujui', 'Disewa', 'Selesai'].includes(o.status)).reduce((sum, o) => sum + o.total, 0)
  const waiting = orders.filter(o => o.status === 'Menunggu').length
  const recent = [...orders].slice(0, 4)
  const popular = products.slice(0, 4)
  return (
    <div className="page-content">
      <div className="welcome-banner"><div><h2>Ringkasan hari ini</h2></div><div className="welcome-date"><CalendarDays size={16} /> {tanggalHariIni()}</div></div>
      <div className="stats-grid"><StatCard label="Barang saya" value={products.length} note="Barang yang kamu sewakan" icon={Package} /><StatCard label="Total pesanan" value={orders.length} note="Semua pesanan masuk" icon={ClipboardList} color="purple" /><StatCard label="Menunggu persetujuan" value={waiting} note="Perlu ditindaklanjuti" icon={Clock3} color="orange" /><StatCard label="Pendapatan" value={rupiah(revenue)} note="Dari pesanan disetujui" icon={ArrowUpRight} color="blue" /></div>
      <div className="dashboard-columns"><section className="panel"><div className="panel-heading"><div><h3>Pesanan terbaru</h3><p>Aktivitas penyewaan terkini</p></div><button className="text-link" onClick={() => navigate('/menyewakan/pesanan')}>Lihat semua <ArrowUpRight size={14} /></button></div><div className="recent-list">{recent.map(o => <div className="recent-item" key={o.id}><div className="recent-product-icon"><Package size={18} /></div><div className="recent-info"><strong>{o.productName}</strong><span>{o.customer} · {o.id}</span></div><div className="recent-right"><strong>{rupiah(o.total)}</strong><OrderStatus status={o.status} /></div></div>)}{!recent.length && <div className="table-empty">Belum ada pesanan.</div>}</div></section>
      <section className="panel"><div className="panel-heading"><div><h3>Barang saya</h3><p>Barang yang kamu sewakan</p></div><button className="text-link" onClick={() => navigate('/menyewakan/barang')}>Kelola <ArrowUpRight size={14} /></button></div><div className="popular-list">{popular.map(p => <div className="popular-item" key={p.id}><ProductImage product={p} /><div><strong>{p.name}</strong><span>{p.category}</span></div><strong>{rupiah(p.price)}<small>/hari</small></strong></div>)}</div></section></div>
      
    </div>
  )
}
