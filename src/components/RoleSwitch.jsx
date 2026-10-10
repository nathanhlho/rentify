import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const pilihan = [['user', 'Penyewa'], ['admin', 'Admin']]

export default function RoleSwitch() {
  const { role, setRole } = useAuth()
  const navigate = useNavigate()

  function pilih(id) {
    setRole(id)
    navigate(id === 'admin' ? '/admin/dashboard' : '/')
  }

  return (
    <div className="role-toggle" role="group" aria-label="Mode tampilan">
      {pilihan.map(([id, label]) => (
        <button key={id} type="button" className={role === id ? 'on' : ''} aria-pressed={role === id} onClick={() => pilih(id)}>
          {label}
        </button>
      ))}
    </div>
  )
}
