import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { RentalProvider } from './context/RentalContext.jsx'
import './styles.css'

// HashRouter dipakai supaya refresh halaman tidak error di GitHub Pages
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <ToastProvider>
          <RentalProvider>
            <App />
          </RentalProvider>
        </ToastProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
)
