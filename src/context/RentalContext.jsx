import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { starterProducts, initialOrders } from '../data/seed'
import { useAuth } from './AuthContext'

const RentalContext = createContext(null)

const isActive = (status) => ['Menunggu', 'Disetujui', 'Disewa'].includes(status)

export function RentalProvider({ children }) {
  const { user } = useAuth()
  const [products, setProducts] = useLocalStorage('rentify_products_v4', starterProducts)
  const [orders, setOrders] = useLocalStorage('rentify_orders_v4', initialOrders)

  const restock = (productId) =>
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, stock: p.stock + 1 } : p)))

  // ---------- Barang ----------
  const addProduct = (p) => setProducts((prev) => [...prev, { ...p, id: Date.now(), owner: user.name }])
  const updateProduct = (id, data) => setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)))
  const deleteProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id))

  // ---------- Pesanan ----------
  function addOrder({ product, ...data }) {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, stock: Math.max(0, p.stock - 1) } : p)))
    setOrders((prev) => [
      { ...data, id: `RF-${Date.now().toString().slice(-6)}`, owner: product.owner, productId: product.id, productName: product.name, status: 'Menunggu' },
      ...prev,
    ])
  }

  // stok kembali kalau pesanan ditolak, selesai, atau dihapus saat masih aktif
  function updateOrder(id, status) {
    const target = orders.find((o) => o.id === id)
    if (target && isActive(target.status) && !isActive(status)) restock(target.productId)
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
  }

  const cancelOrder = (id) => updateOrder(id, 'Dibatalkan') // dibatalkan penyewa, stok kembali

  function deleteOrder(id) {
    const target = orders.find((o) => o.id === id)
    if (target && isActive(target.status)) restock(target.productId)
    setOrders((prev) => prev.filter((o) => o.id !== id))
  }

  const nilai = { products, orders, addProduct, updateProduct, deleteProduct, addOrder, updateOrder, cancelOrder, deleteOrder }
  return <RentalContext.Provider value={nilai}>{children}</RentalContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRental() {
  return useContext(RentalContext)
}
