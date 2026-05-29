import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, ArrowRight, User } from 'lucide-react'
import Navbar from '../components/Navbar'

export default function Auth() {
  const [esLogin, setEsLogin] = useState(true)
  
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [mostrarContrasena, setMostrarContrasena] = useState(false)
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMensaje(null)
    setCargando(true)

    // Ajusta aca los endpoints segun tu ruteo de Express (usuarios o users)
    const urlBackend = esLogin 
      ? 'http://localhost:4000/api/usuarios/login' 
      : 'http://localhost:4000/api/usuarios/register'

    const cuerpoPeticion = esLogin 
      ? { email, password } 
      : { nombre, email, password }

    try {
      const respuesta = await fetch(urlBackend, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cuerpoPeticion)
      })

      const data = await respuesta.json()

      if (respuesta.ok) {
        console.log("Funciono impecable 🗿", data)
        
        if (esLogin) {
          localStorage.setItem('tokenUsuario', data.token || '')
          localStorage.setItem('nombreUsuario', data.nombre || '')
          localStorage.setItem('apellidoUsuario', data.apellido || '')
          localStorage.setItem('emailUsuario', email)
          localStorage.setItem('dniUsuario', data.dni || '')
          localStorage.setItem('direccionUsuario', data.direccion || '')

          const rutaDestino = localStorage.getItem('ultimaRuta') || '/catalogo'
          localStorage.removeItem('ultimaRuta')
          window.location.href = rutaDestino
        } else {
          alert('¡Usuario registrado con éxito! Ya podés iniciar sesión.')
          setEsLogin(true)
          setNombre('')
          setPassword('')
        }
      } else {
        // Si el backend responde pero con un codigo de error (401, 404, 500)
        console.error("El backend rechazo la solicitud", data)
        
        if (respuesta.status === 401) {
          setErrorMensaje('El correo ingresado no está registrado o la contraseña es incorrecta')
        } else {
          setErrorMensaje(data.message || 'Ocurrió un problema, revisá los datos')
        }
        
        setTimeout(() => {
          setErrorMensaje(null)
        }, 5000)
      }
    } catch (error) {
      // Este bloque solo se ejecuta si el servidor de Express esta apagado
      console.error("Error de conexion con el servidor", error)
      setErrorMensaje('No se pudo establecer conexión con el servidor principal. Intentá más tarde.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(screen-64px)] bg-gray-50 dark:bg-[#0f0f11] flex items-center justify-center p-4 transition-colors duration-300">
        <div className="max-w-md w-full bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/5 rounded-3xl p-8 shadow-xl transition-colors duration-300">
          
          <div className="flex bg-gray-100 dark:bg-black/20 p-1 rounded-xl mb-8">
            <button
              type="button"
              onClick={() => { setEsLogin(true); setErrorMensaje(null); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${esLogin ? 'bg-white dark:bg-[#28282a] text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => { setEsLogin(false); setErrorMensaje(null); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${!esLogin ? 'bg-white dark:bg-[#28282a] text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Registrarse
            </button>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">
              {esLogin ? '¡Hola de nuevo!' : 'Creá tu cuenta'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {esLogin ? 'Ingresá tus credenciales para entrar a Cartium' : 'Completá los campos para empezar a operar'}
            </p>
          </div>

          <form onSubmit={manejarEnvio} className="flex flex-col gap-5">
            
            {!esLogin && (
              <div className="relative">
                <User className="absolute left-4 top-4 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                  required={!esLogin}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
              <input
                type={mostrarContrasena ? 'text' : 'password'}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-12 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setMostrarContrasena(!mostrarContrasena)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
              >
                {mostrarContrasena ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-[#4e7ef0] hover:bg-blue-600 disabled:bg-gray-400 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 mt-2 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              {cargando ? 'Procesando...' : esLogin ? 'Iniciar Sesión' : 'Registrarse'} 
              {!cargando && <ArrowRight size={18} />}
            </button>

            {errorMensaje && (
              <div className="w-full bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 p-3.5 rounded-2xl text-center text-xs font-bold animate-pulse mt-2">
                ⚠️ {errorMensaje}
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <Link to="/catalogo" className="text-xs font-bold text-gray-400 hover:text-[#5c8aff] transition-colors">
              Volver a la tienda sin loguearme
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}