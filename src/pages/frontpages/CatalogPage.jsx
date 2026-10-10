import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Search, SlidersHorizontal, ArrowUpRight } from 'lucide-react'
import { useRental } from '../../context/RentalContext'
import { useAuth } from '../../context/AuthContext'
import ProductCard from '../../components/ProductCard'

export default function CatalogPage() {
  const { search, setSearch, setSelectedProduct } = useOutletContext()
  const [category, setCategory] = useState('Semua')
  const { products: semuaBarang } = useRental()
  const { user } = useAuth()
  const products = semuaBarang.filter(p => p.owner !== user.name) // barang milik sendiri tidak tampil di katalog
  const categories = ['Semua', ...new Set(products.map(p => p.category))]
  const filtered = products.filter(p => (category === 'Semua' || p.category === category) && `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="page-content">
      <section className="hero-banner">
        <div className="hero-copy"><h2>Sewa barang yang kamu perlukan,<br /><em>tanpa harus membeli.</em></h2><p>Kamera, konsol, perlengkapan camping, sampai alat kerja. Pilih barangnya, tentukan tanggal, lalu pesan.</p><button className="hero-button" onClick={() => document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' })}>Lihat barang <ArrowUpRight size={16} /></button></div>
        <div className="hero-visual"><div className="hero-circle" /><img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=85" alt="Kamera untuk disewa" /></div>
      </section>
      <div className="section-heading" id="catalog-grid"><div><h2>Semua barang</h2><p>Pilih barang, lalu tentukan tanggal sewa.</p></div><div className="catalog-count"><strong>{filtered.length}</strong><span>barang tersedia</span></div></div>
      <div className="catalog-toolbar"><div className="category-tabs">{categories.map(c => <button key={c} onClick={() => setCategory(c)} className={category === c ? 'selected' : ''}>{c}</button>)}</div><button className="filter-button" onClick={() => setCategory('Semua')}><SlidersHorizontal size={16} /> Reset filter</button></div>
      {filtered.length ? <div className="product-grid">{filtered.map(product => <ProductCard key={product.id} product={product} onRent={setSelectedProduct} />)}</div> : <div className="empty-state"><Search size={30} /><h3>Barang tidak ditemukan</h3><p>Coba kata kunci atau kategori lain.</p><button className="button-secondary" onClick={() => { setSearch(''); setCategory('Semua') }}>Hapus pencarian</button></div>}
    </div>
  )
}
