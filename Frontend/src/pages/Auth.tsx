import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, ArrowRight, User, MapPin, CreditCard } from 'lucide-react'
import Navbar from '../components/Navbar'

export default function Auth() {
  const [esLogin, setEsLogin] = useState(true)
  // const navigate = useNavigate()
  
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dni, setDni] = useState('')
  const [direccion, setDireccion] = useState('')
  
  const [mostrarContrasena, setMostrarContrasena] = useState(false)
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMensaje(null)
    setCargando(true)

    const urlBackend = esLogin 
      ? 'http://localhost:4000/api/usuarios/login' 
      : 'http://localhost:4000/api/usuarios/register'

    // armamos el paquete segun la accion
    const cuerpoPeticion = esLogin 
      ? { email, password } 
      : { nombre, apellido, email, password, dni, direccion }

    try {
      const respuesta = await fetch(urlBackend, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cuerpoPeticion)
      })

      const data = await respuesta.json()

      if (respuesta.ok) {
        if (esLogin) {
          // guardamos las variables del login
          localStorage.setItem('token', data.token || '')
          localStorage.setItem('rol', data.rol || '')
          localStorage.setItem('nombreUsuario', data.usuario?.nombre || '')
          localStorage.setItem('apellidoUsuario', data.usuario?.apellido || '')
          localStorage.setItem('emailUsuario', data.usuario?.email || '')
          localStorage.setItem('dniUsuario', data.usuario?.dni || '')
          localStorage.setItem('direccionUsuario', data.usuario?.direccion || '')

          const rutaDestino = localStorage.getItem('ultimaRuta') || '/catalogo'
          localStorage.removeItem('ultimaRuta')
          window.location.href = rutaDestino
        } else {
          // auto login despues de registrar
          const loginMudo = await fetch('http://localhost:4000/api/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          })
          
          const dataLogin = await loginMudo.json()

          if (loginMudo.ok) {
            localStorage.setItem('token', dataLogin.token || '')
            localStorage.setItem('rol', dataLogin.rol || '')
            localStorage.setItem('nombreUsuario', dataLogin.usuario?.nombre || '')
            localStorage.setItem('apellidoUsuario', dataLogin.usuario?.apellido || '')
            localStorage.setItem('emailUsuario', dataLogin.usuario?.email || '')
            localStorage.setItem('dniUsuario', dataLogin.usuario?.dni || '')
            localStorage.setItem('direccionUsuario', dataLogin.usuario?.direccion || '')

            const rutaDestino = localStorage.getItem('ultimaRuta') || '/catalogo'
            localStorage.removeItem('ultimaRuta')
            window.location.href = rutaDestino
          } else {
            // si por alguna anomalia falla el auto login lo mandamos a la pestaña normal
            alert('Cuenta creada pero hubo un fallo al iniciar sesion automatico')
            setEsLogin(true)
          }
        }
      } else {
        console.error("el backend rechazo la solicitud", data)
        if (respuesta.status === 401) {
          setErrorMensaje('El correo ingresado no está registrado o la contraseña es incorrecta')
        } else {
          setErrorMensaje(data.error || data.message || 'Ocurrió un problema revisá los datos')
        }
        setTimeout(() => {
          setErrorMensaje(null)
        }, 5000)
      }
    } catch (error) {
      console.error("error de conexion con el servidor", error)
      setErrorMensaje('No se pudo establecer conexión con el servidor principal. Intentá más tarde.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-[#0f0f11] flex items-center justify-center p-4 transition-colors duration-300">
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
              <div className="flex flex-col gap-5">
                <div className="relative">
                  <User className="absolute left-4 top-4 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                    required={!esLogin}
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-4 top-4 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                    required={!esLogin}
                  />
                </div>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-4 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="DNI"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                    required={!esLogin}
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                    required={!esLogin}
                  />
                </div>
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