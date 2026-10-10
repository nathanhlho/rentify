import { useState } from 'react'
import { Package, Check, Clock3, X, Trash2, CheckCircle2 } from 'lucide-react'
import { rupiah } from '../utils/format'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useRental } from '../context/RentalContext'
import OrderStatus from '../components/OrderStatus'

export default function OrdersPage({ pemilik = false }) {
  const { orders: semuaPesanan, updateOrder, cancelOrder, deleteOrder } = useRental()
  const { user } = useAuth()
  const toast = useToast()
  // Pesanan Saya: Jonatan sebagai penyewa. Pesanan Masuk: Jonatan sebagai pemilik barang.
  const orders = semuaPesanan.filter(o => (pemilik ? o.owner : o.customer) === user.name)
  const [filter, setFilter] = useState('Semua')
  const visible = orders.filter(o => filter === 'Semua' || o.status === filter)
  function batalkan(o) {
    if (!confirm(`Batalkan pesanan ${o.productName}?`)) return
    cancelOrder(o.id)
    toast('Pesanan dibatalkan.')
  }
  return (
    <div className="page-content">
      <div className="section-heading orders-heading"><div><h2>{pemilik ? 'Pesanan masuk' : 'Pesanan saya'}</h2><p>{pemilik ? 'Kelola dan perbarui status pesanan dari penyewa.' : 'Pantau status dan detail pesanan penyewaanmu.'}</p></div><div className="order-total"><strong>{orders.length}</strong><span>Total pesanan</span></div></div>
      <div className="orders-toolbar"><div className="category-tabs">{['Semua', 'Menunggu', 'Disetujui', 'Disewa', 'Selesai', 'Ditolak', 'Dibatalkan'].map(s => <button key={s} className={filter === s ? 'selected' : ''} onClick={() => setFilter(s)}>{s}</button>)}</div></div>
      <div className="table-card"><div className="table-scroll"><table><thead><tr><th>ID PESANAN</th><th>BARANG</th><th>{pemilik ? 'PENYEWA' : 'PEMILIK'}</th><th>PERIODE</th><th>TOTAL</th><th>STATUS</th><th>AKSI</th></tr></thead><tbody>
        {visible.map(o => <tr key={o.id}><td><strong className="order-id">{o.id}</strong><span className="table-sub">{o.payment}</span></td><td><div className="table-product"><span className="table-product-icon"><Package size={17} /></span><strong>{o.productName}</strong></div></td><td>{pemilik ? o.customer : o.owner}</td><td><span>{o.start}</span><span className="table-sub">s/d {o.end} · {o.days} hari</span></td><td><strong>{rupiah(o.total)}</strong></td><td><OrderStatus status={o.status} /></td><td><div className="table-actions">{!pemilik && ['Menunggu', 'Disetujui'].includes(o.status) && <button className="button-danger" onClick={() => batalkan(o)}>Batalkan</button>}{pemilik && <>{o.status === 'Menunggu' && <><button title="Setujui" className="mini-action approve" onClick={() => updateOrder(o.id, 'Disetujui')}><Check size={15} /></button><button title="Tolak" className="mini-action reject" onClick={() => updateOrder(o.id, 'Ditolak')}><X size={15} /></button></>}{o.status === 'Disetujui' && <button className="mini-action approve" title="Tandai sedang disewa" onClick={() => updateOrder(o.id, 'Disewa')}><Clock3 size={15} /></button>}{o.status === 'Disewa' && <button className="mini-action approve" title="Tandai selesai" onClick={() => updateOrder(o.id, 'Selesai')}><CheckCircle2 size={15} /></button>}<button title="Hapus pesanan" className="mini-action reject" onClick={() => deleteOrder(o.id)}><Trash2 size={15} /></button></>}</div></td></tr>)}
        {!visible.length && <tr><td colSpan={7}><div className="table-empty">Belum ada pesanan pada status ini.</div></td></tr>}
      </tbody></table></div></div>
      
    </div>
  )
}
