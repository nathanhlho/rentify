import { useState } from 'react'
import { Plus, Check, X, Trash2, Pencil } from 'lucide-react'
import { rupiah } from '../../utils/format'
import { KATEGORI } from '../../data/seed'
import { useRental } from '../../context/RentalContext'
import { useAuth } from '../../context/AuthContext'
import ProductImage from '../../components/ProductImage'

export default function AdminProducts() {
  const { products: semuaBarang, addProduct, updateProduct, deleteProduct } = useRental()
  const { user } = useAuth()
  const products = semuaBarang.filter(p => p.owner === user.name)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', category: 'Elektronik', price: '', stock: '', image: '', description: '' })
  const [showForm, setShowForm] = useState(false)
  function openNew() { setEditing(null); setForm({ name: '', category: 'Elektronik', price: '', stock: '', image: '', description: '' }); setShowForm(true) }
  function openEdit(p) { setEditing(p.id); setForm({ ...p, price: String(p.price), stock: String(p.stock) }); setShowForm(true) }
  function submit(e) {
    e.preventDefault()
    const item = { ...form, price: Number(form.price), stock: Number(form.stock), rating: editing ? (products.find(p => p.id === editing)?.rating || 4.8) : 4.8, image: form.image.trim() }
    if (!item.name.trim() || item.price <= 0 || item.stock < 0) return
    editing ? updateProduct(editing, item) : addProduct(item)
    setShowForm(false)
  }
  return (
    <div className="page-content">
      <div className="section-heading"><div><h2>Barang yang kamu sewakan</h2><p>Tambah, ubah, atau hapus barang milikmu.</p></div><button className="button-primary" onClick={openNew}><Plus size={17} /> Tambah barang</button></div>
      {products.length === 0 && <div className="empty-state"><h3>Belum ada barang yang kamu sewakan</h3><p>Tambahkan barang pertamamu dengan tombol di atas.</p></div>}<div className="manage-grid">{products.map(p => <div className="manage-card" key={p.id}><ProductImage product={p} /><div className="manage-card-body"><span className="muted small">{p.category}</span><h3>{p.name}</h3><div className="manage-meta"><strong>{rupiah(p.price)} <small>/ hari</small></strong><span>Stok: {p.stock}</span></div><div className="manage-actions"><button className="button-secondary" onClick={() => openEdit(p)}><Pencil size={14} /> Edit</button><button className="button-danger" onClick={() => { if (confirm(`Hapus ${p.name} dari katalog?`)) deleteProduct(p.id) }}><Trash2 size={14} /> Hapus</button></div></div></div>)}</div>
      {showForm && <div className="modal-backdrop"><form className="booking-modal manage-modal" onSubmit={submit}><div className="modal-header"><div><h2>{editing ? 'Edit barang' : 'Tambah barang'}</h2></div><button type="button" className="plain-icon" onClick={() => setShowForm(false)}><X size={20} /></button></div><label className="field-label">Nama barang<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label><div className="field-grid"><label className="field-label">Kategori<select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>{KATEGORI.map(c => <option key={c}>{c}</option>)}</select></label><label className="field-label">Harga per hari<input type="number" min="1" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></label></div><label className="field-label">Jumlah stok<input type="number" min="0" required value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} /></label><label className="field-label">URL gambar (opsional)<input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." /></label><label className="field-label">Deskripsi<input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></label><div className="modal-actions"><button type="button" className="button-secondary" onClick={() => setShowForm(false)}>Batal</button><button className="button-primary" type="submit">Simpan barang <Check size={16} /></button></div></form></div>}
    </div>
  )
}
