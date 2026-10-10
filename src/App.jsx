import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

// Tab Disewakan (menyewa barang orang lain)
import CatalogPage from './pages/frontpages/CatalogPage'
import OrdersPage from './pages/OrdersPage'

// Tab Menyewakan (barang milik sendiri)
import AdminDashboard from './pages/adminpages/AdminDashboard'
import AdminProducts from './pages/adminpages/AdminProducts'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<CatalogPage />} />
        <Route path="orders" element={<OrdersPage />} />

        <Route path="menyewakan">
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="barang" element={<AdminProducts />} />
          <Route path="pesanan" element={<OrdersPage pemilik />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
