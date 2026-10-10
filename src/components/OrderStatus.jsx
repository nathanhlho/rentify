

export default function OrderStatus({ status }) {
  const cls = status === 'Disetujui' || status === 'Selesai' ? 'success' : status === 'Ditolak' || status === 'Dibatalkan' ? 'danger' : status === 'Disewa' ? 'info' : 'warning'
  return <span className={`status-badge ${cls}`}><span />{status}</span>
}
