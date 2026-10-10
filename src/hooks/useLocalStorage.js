import { useEffect, useState } from 'react'

export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* penyimpanan penuh atau diblokir */ }
  }, [key, value])

  return [value, setValue]
}
