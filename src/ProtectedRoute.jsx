import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, cargando } = useAuth()
  if (cargando) return <p>Cargando...</p>
  if (!user) return <Navigate to="/login" replace />
  return children
}