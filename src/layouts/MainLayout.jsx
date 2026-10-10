import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import BookingModal from '../components/BookingModal'
import { useRental } from '../context/RentalContext'
import { useToast } from '../context/ToastContext'

export default function MainLayout() {
  const { addOrder } = useRental()
  const toast = useToast()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  function createOrder(data) {
    addOrder(data)
    setSelectedProduct(null)
    navigate('/orders')
    toast('Pesanan berhasil dibuat.')
  }

  return (
    <>
      <div className="app-shell">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <main className="main-area">
          <Topbar search={search} setSearch={setSearch} setMobileOpen={setMobileOpen} />
          <Outlet context={{ search, setSearch, setSelectedProduct }} />
          <footer className="app-footer"><span>© 2026 Rentify</span></footer>
        </main>
      </div>
      {selectedProduct && <BookingModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onSubmit={createOrder} />}
    </>
  )
}
