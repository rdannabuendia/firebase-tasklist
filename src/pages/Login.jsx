import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [modoRegistro, setModoRegistro] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const enviar = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (modoRegistro) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      navigate('/tareas')
    } catch (err) {
      setError(err.message)
    }
  }

  const conGoogle = async () => {
    setError('')
    try {
      await signInWithPopup(auth, googleProvider)
      navigate('/tareas')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="login-pagina">
      <div className="tarjeta">
        <h1>{modoRegistro ? 'Crear cuenta' : 'Iniciar sesión'}</h1>

        <form onSubmit={enviar} className="formulario">
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña (mín. 6)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button type="submit" className="btn-primario">
            {modoRegistro ? 'Registrarme' : 'Entrar'}
          </button>
        </form>

        <div className="separador">o</div>

        <button onClick={conGoogle} className="btn-google">
          Continuar con Google
        </button>

        <p className="cambio-modo">
          <button className="btn-enlace" onClick={() => setModoRegistro(!modoRegistro)}>
            {modoRegistro ? 'Ya tengo cuenta' : 'No tengo cuenta, registrarme'}
          </button>
        </p>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  )
}