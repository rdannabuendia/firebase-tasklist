import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    // Firebase avisa cada vez que cambia la sesión (login, logout, recarga)
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setCargando(false)
    })
    return unsub
  }, [])

  return (
    <AuthContext.Provider value={{ user, cargando }}>
      {children}
    </AuthContext.Provider>
  )
}