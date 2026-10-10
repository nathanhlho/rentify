import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { ArrowUpRight, X } from 'lucide-react'
import { rupiah, todayLocal } from '../utils/format'
import ProductImage from '../components/ProductImage'

export default function BookingModal({ product, onClose, onSubmit }) {
  const today = todayLocal()
  const [start, setStart] = useState(today)
  const [end, setEnd] = useState(today)
  const { user } = useAuth()
  const customer = user.name
  const [payment, setPayment] = useState('Transfer bank')
  const [error, setError] = useState('')
  const days = start && end ? Math.max(0, Math.ceil((new Date(`${end}T00:00:00`) - new Date(`${start}T00:00:00`)) / 86400000) + 1) : 0
  const total = days * product.price
  function submit(e) {
    e.preventDefault()
    if (!start || !end || end < start) return setError('Tanggal selesai harus sama atau setelah tanggal mulai.')
    onSubmit({ product, start, end, days, total, customer, payment })
  }
  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <form className="booking-modal" onSubmit={submit}>
        <div className="modal-header"><div><h2>Sewa barang</h2></div><button type="button" className="plain-icon" onClick={onClose}><X size={20} /></button></div>
        <div className="modal-product"><ProductImage product={product} /><div><strong>{product.name}</strong><p>{rupiah(product.price)} / hari</p></div></div>
        
        <div className="field-grid"><label className="field-label">Tanggal mulai<input type="date" min={today} value={start} onChange={(e) => setStart(e.target.value)} /></label><label className="field-label">Tanggal selesai<input type="date" min={start} value={end} onChange={(e) => setEnd(e.target.value)} /></label></div>
        <label className="field-label">Metode pembayaran<select value={payment} onChange={(e) => setPayment(e.target.value)}><option>Transfer bank</option><option>QRIS</option><option>E-wallet</option><option>Bayar saat ambil</option></select></label>
        <div className="price-summary"><div><span>Pemilik</span><strong>{product.owner}</strong></div><div><span>Penyewa</span><strong>{customer}</strong></div><div><span>Durasi sewa</span><strong>{days} hari</strong></div><div><span>Harga per hari</span><strong>{rupiah(product.price)}</strong></div><div className="price-total"><span>Total estimasi</span><strong>{rupiah(total)}</strong></div></div>
        {error && <p className="form-error">{error}</p>}
                <div className="modal-actions"><button type="button" className="button-secondary" onClick={onClose}>Batal</button><button className="button-primary" type="submit">Buat pesanan <ArrowUpRight size={16} /></button></div>
      </form>
    </div>
  )
}
