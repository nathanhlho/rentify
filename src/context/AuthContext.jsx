import { createContext, useContext } from 'react'

const AuthContext = createContext(null)

// Satu akun tetap (tanpa login). Dipakai untuk nama penyewa dan filter "Pesanan Saya".
const user = { name: 'Jonatan', initials: 'JO' }

export function AuthProvider({ children }) {
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
