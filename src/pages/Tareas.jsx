import { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import {
  addDoc, collection, deleteDoc, doc, onSnapshot,
  query, serverTimestamp, updateDoc, where,
} from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useAuth } from '../AuthContext'

export default function Tareas() {
  const { user } = useAuth()
  const [tareas, setTareas] = useState([])
  const [titulo, setTitulo] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [textoEdicion, setTextoEdicion] = useState('')

  // TIEMPO REAL: onSnapshot se dispara cada vez que cambian los datos
  useEffect(() => {
    const q = query(collection(db, 'tareas'), where('uid', '==', user.uid))
    const unsub = onSnapshot(q, (snap) => {
      const lista = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      // Ordenamos en cliente para no necesitar un índice compuesto
      lista.sort((a, b) => (b.creadaEn?.seconds ?? 0) - (a.creadaEn?.seconds ?? 0))
      setTareas(lista)
    })
    return unsub // deja de escuchar al salir de la pantalla
  }, [user.uid])

  // CREATE
  const agregar = async (e) => {
    e.preventDefault()
    if (!titulo.trim()) return
    await addDoc(collection(db, 'tareas'), {
      titulo: titulo.trim(),
      completada: false,
      uid: user.uid,
      creadaEn: serverTimestamp(),
    })
    setTitulo('')
  }

  // UPDATE (completar)
  const alternar = (t) =>
    updateDoc(doc(db, 'tareas', t.id), { completada: !t.completada })

  // UPDATE (editar texto)
  const guardarEdicion = async (id) => {
    if (!textoEdicion.trim()) return
    await updateDoc(doc(db, 'tareas', id), { titulo: textoEdicion.trim() })
    setEditandoId(null)
  }

  // DELETE
  const eliminar = (id) => deleteDoc(doc(db, 'tareas', id))

  return (
    <div className="tareas-pagina">
      <header className="tareas-encabezado">
        <h1>Mis tareas</h1>
        <button onClick={() => signOut(auth)}>Cerrar sesión</button>
      </header>
      <p className="correo-usuario">{user.email}</p>

      <form onSubmit={agregar} className="nueva-tarea">
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button type="submit" className="btn-primario">Agregar</button>
      </form>

      {tareas.length === 0 && <p className="vacio">No tienes tareas todavía ✨</p>}

      <ul className="lista-tareas">
        {tareas.map((t) => (
          <li key={t.id} className={`tarea ${t.completada ? 'completada' : ''}`}>
            <input type="checkbox" checked={t.completada} onChange={() => alternar(t)} />
            {editandoId === t.id ? (
              <div className="tarea-edicion">
                <input
                  type="text"
                  value={textoEdicion}
                  onChange={(e) => setTextoEdicion(e.target.value)}
                />
                <button className="btn-chico btn-primario" onClick={() => guardarEdicion(t.id)}>
                  Guardar
                </button>
                <button className="btn-chico" onClick={() => setEditandoId(null)}>
                  Cancelar
                </button>
              </div>
            ) : (
              <>
                <span className="tarea-texto">{t.titulo}</span>
                <div className="tarea-acciones">
                  <button
                    className="btn-chico"
                    onClick={() => { setEditandoId(t.id); setTextoEdicion(t.titulo) }}
                  >
                    Editar
                  </button>
                  <button className="btn-chico btn-peligro" onClick={() => eliminar(t.id)}>
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}