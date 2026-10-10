import { useState } from 'react'

// Gambar produk. Kalau URL gagal dimuat, tampil placeholder bertuliskan nama barang.
function placeholder(name) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450"><rect width="100%" height="100%" fill="#e4ede7"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="30" fill="#4d6b5b">${name.replace(/[<>&]/g, '')}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export default function ProductImage({ product, className }) {
  const [gagal, setGagal] = useState(false)
  const src = gagal || !product.image ? placeholder(product.name) : product.image
  return <img className={className} src={src} alt={product.name} loading="lazy" onError={() => setGagal(true)} />
}
