

export default function StatCard({ label, value, note, icon: Icon, color = 'green' }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}><Icon size={19} /></div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-note">{note}</div>
    </div>
  )
}
