import { useState, useEffect } from 'react'
import { User, MapPin, IdCard, Mail, FileText, Save, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Chatbot from '../components/Chatbot'

export default function Perfil() {
  const [pestanaActiva, setPestanaActiva] = useState<'datos' | 'facturas'>('datos')
  const [cargando, setCargando] = useState(false)
  // eslint-disable-next-line
  const [facturas, setFacturas] = useState<any[]>([])

  // levantamos de forma dinamica todo lo que guardo el auth al iniciar sesion
  const [datos, setDatos] = useState({
    nombre: localStorage.getItem('nombreUsuario') || '',
    apellido: localStorage.getItem('apellidoUsuario') || '',
    email: localStorage.getItem('emailUsuario') || 'ejemplo@correo.com', 
    dni: localStorage.getItem('dniUsuario') || '',
    direccion: localStorage.getItem('direccionUsuario') || ''
  })

  // disparamos la lectura automatica al montar el componente
  useEffect(() => {
    const cargarFacturas = async () => {
      const emailActivo = localStorage.getItem('emailUsuario')
      if (!emailActivo) return

      try {
        const respuesta = await fetch(`http://localhost:4000/api/pagos/facturas/${emailActivo}`)
        if (respuesta.ok) {
          const data = await respuesta.json()
          setFacturas(data)
        }
      } catch (error) {
        console.error('fallo al recuperar el historial', error)
      }
    }

    cargarFacturas()
  }, [])

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDatos(prev => ({ ...prev, [name]: value }))
  }

  const guardarCambios = async () => {
    setCargando(true)
    const emailActivo = localStorage.getItem('emailUsuario')
    
    try {
      const respuesta = await fetch('http://localhost:4000/api/usuarios/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: datos.nombre,       
          apellido: datos.apellido,
          direccion: datos.direccion,
          dni: datos.dni,
          email: emailActivo    
        })
      })

      if (respuesta.ok) {
        alert('¡Datos actualizados con éxito!')
        
        // actualizamos la memoria completa para que la app lea los datos frescos
        localStorage.setItem('nombreUsuario', datos.nombre)
        localStorage.setItem('apellidoUsuario', datos.apellido)
        localStorage.setItem('direccionUsuario', datos.direccion)
        localStorage.setItem('dniUsuario', datos.dni)
        
        window.location.reload()
      } else {
        const data = await respuesta.json()
        console.error('el servidor reboto la solicitud', data)
      }
    } catch (error) {
      console.error('fallo estructural en la conexion', error)
    } finally {
      setCargando(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f11] text-gray-900 dark:text-white p-4 transition-colors duration-300">
        <div className="max-w-4xl mx-auto mt-6">
          
          <div className="flex items-center gap-4 mb-6">
            <Link to="/catalogo" className="p-2 rounded-xl bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-all">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-3xl font-black tracking-tight">Mi Perfil</h1>
          </div>

          <div className="flex bg-gray-100 dark:bg-black/20 p-1 rounded-xl mb-8 max-w-md">
            <button
              type="button"
              onClick={() => setPestanaActiva('datos')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${pestanaActiva === 'datos' ? 'bg-white dark:bg-[#28282a] text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Mis Datos
            </button>
            <button
              type="button"
              onClick={() => setPestanaActiva('facturas')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${pestanaActiva === 'facturas' ? 'bg-white dark:bg-[#28282a] text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Mis Facturas
            </button>
          </div>

          {pestanaActiva === 'datos' ? (
            <div className="bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/5 rounded-3xl p-8 shadow-xl transition-colors duration-300">
              <h2 className="text-xl font-bold mb-6 border-b border-gray-200 dark:border-white/10 pb-4">Información Personal</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="relative">
                  <label className="text-xs font-bold text-gray-400 block mb-2">Nombre</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="nombre"
                      value={datos.nombre}
                      onChange={manejarCambio}
                      className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-xs font-bold text-gray-400 block mb-2">Apellido</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="apellido"
                      value={datos.apellido}
                      onChange={manejarCambio}
                      className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-xs font-bold text-gray-400 block mb-2">DNI</label>
                  <div className="relative">
                    <IdCard className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="dni"
                      value={datos.dni}
                      onChange={manejarCambio}
                      className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-xs font-bold text-gray-400 block mb-2">Dirección</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="direccion"
                      value={datos.direccion}
                      onChange={manejarCambio}
                      className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                    />
                  </div>
                </div>

                <div className="relative md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 block mb-2">Correo Electrónico</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={datos.email}
                      disabled
                      className="w-full bg-gray-200/50 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-400 rounded-2xl py-3.5 pl-12 pr-4 text-sm cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={guardarCambios}
                  disabled={cargando}
                  className="bg-[#4e7ef0] hover:bg-blue-600 disabled:bg-gray-400 text-white py-3 px-8 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <Save size={18} />
                  {cargando ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/5 rounded-3xl p-8 shadow-xl transition-colors duration-300">
              <h2 className="text-xl font-bold mb-6 border-b border-gray-200 dark:border-white/10 pb-4">Historial de Compras</h2>
              
              {facturas.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">No tenés facturas registradas todavía</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-100 dark:bg-[#0f0f11] text-gray-700 dark:text-gray-300 text-xs font-black uppercase tracking-wider rounded-xl">
                      <tr>
                        <th className="px-4 py-3 rounded-l-xl">Factura</th>
                        <th className="px-4 py-3">Fecha</th>
                        <th className="px-4 py-3">Total</th>
                        <th className="px-4 py-3 rounded-r-xl">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                      {facturas.map((fac) => (
                        <tr key={fac.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                          <td className="px-4 py-4 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <FileText size={16} className="text-gray-400" /> FAC-{fac.id}
                          </td>
                          <td className="px-4 py-4">{fac.fecha}</td>
                          <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                            ${Number(fac.total).toLocaleString('es-AR')}
                          </td>
                          <td className="px-4 py-4">
                            <span className="bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs px-2.5 py-1 rounded-full font-bold">
                              {fac.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
      <Chatbot />
    </>
  )
}