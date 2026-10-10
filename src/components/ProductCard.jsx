import { Plus, Camera, Gamepad2, Tent, Wrench, Monitor } from 'lucide-react'
import { rupiah } from '../utils/format'
import ProductImage from '../components/ProductImage'

export default function ProductCard({ product, onRent }) {
  const Icon = product.category === 'Kamera' ? Camera : product.category === 'Gaming' ? Gamepad2 : product.category === 'Outdoor' ? Tent : product.category === 'Peralatan' ? Wrench : Monitor
  const soldOut = product.stock <= 0
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <ProductImage className="product-image" product={product} />
        <span className="category-pill"><Icon size={13} /> {product.category}</span>
        <span className="rating">★ {product.rating}</span>
      </div>
      <div className="product-info">
        <div className="product-name-row">
          <h3>{product.name}</h3>
          <span className={`stock-dot ${soldOut ? 'out' : ''}`} title={soldOut ? 'Stok habis' : 'Stok tersedia'}>{soldOut ? 'Habis' : product.stock}</span>
        </div>
        <p className="muted small">{product.description}</p><p className="muted small">Pemilik: {product.owner}</p>
        <div className="product-bottom">
          <div><strong>{rupiah(product.price)}</strong><span className="muted small"> / hari</span></div>
          <button className="icon-button rent-button" disabled={soldOut} onClick={() => onRent(product)} aria-label={`Sewa ${product.name}`}><Plus size={18} /></button>
        </div>
      </div>
    </article>
  )
}
