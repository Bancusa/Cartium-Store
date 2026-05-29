import { useState } from 'react'
import { User, MapPin, IdCard, Mail, FileText, Save, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Chatbot from '../components/Chatbot'

export default function Perfil() {
  const [pestanaActiva, setPestanaActiva] = useState<'datos' | 'facturas'>('datos')
  const [cargando, setCargando] = useState(false)

  // Levantamos de forma dinamica todo lo que guardo el Auth al iniciar sesion
  const [datos, setDatos] = useState({
    nombre: localStorage.getItem('nombreUsuario') || '',
    apellido: localStorage.getItem('apellidoUsuario') || '',
    email: localStorage.getItem('emailUsuario') || 'ejemplo@correo.com', 
    dni: localStorage.getItem('dniUsuario') || '',
    direccion: localStorage.getItem('direccionUsuario') || ''
  })

  const facturasSimuladas = [
    { id: 'FAC-001', fecha: '25/05/2026', total: 154000, estado: 'Pagado' },
    { id: 'FAC-002', fecha: '12/05/2026', total: 85000, estado: 'Pagado' }
  ]

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }

  // ENVIAR LOS DATOS NUEVOS AL BACKEND
  const guardarCambios = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)

    try {
      // cambiamos users por usuarios para que coincida con el backend
      const respuesta = await fetch('http://localhost:4000/api/usuarios/actualizar-perfil', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      })

      const resultado = await respuesta.json()

      if (respuesta.ok) {
        localStorage.setItem('nombreUsuario', datos.nombre)
        localStorage.setItem('apellidoUsuario', datos.apellido)
        localStorage.setItem('dniUsuario', datos.dni)
        localStorage.setItem('direccionUsuario', datos.direccion)
        
        alert('¡Datos guardados con éxito en la base de datos! 🗿')
        window.location.reload()
      } else {
        alert(resultado.message || 'Error al guardar en el servidor')
      }
    } catch (error) {
      console.error('Error de conexion:', error)
      alert('No se pudo conectar con el servidor para guardar los datos')
    } finally {
      setCargando(false)
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f11] py-10 px-4 md:px-8 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          
          <Link to="/catalogo" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#5c8aff] transition-colors mb-6 font-bold">
            <ArrowLeft size={16} /> Volver al catálogo
          </Link>

          <div className="bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-xl transition-colors duration-300">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 dark:border-white/5 pb-6 mb-8">
              <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white">Mi Perfil</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Gestioná tu información personal y revisá tus comprobantes de compra</p>
              </div>

              <div className="flex bg-gray-100 dark:bg-black/20 p-1.5 rounded-2xl w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setPestanaActiva('datos')}
                  className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${pestanaActiva === 'datos' ? 'bg-[#5c8aff] text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                >
                  <User size={16} /> Mis Datos
                </button>
                <button
                  type="button"
                  onClick={() => setPestanaActiva('facturas')}
                  className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${pestanaActiva === 'facturas' ? 'bg-[#5c8aff] text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                >
                  <FileText size={16} /> Facturas
                </button>
              </div>
            </div>

            {pestanaActiva === 'datos' && (
              <form onSubmit={guardarCambios} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="relative">
                    <User className="absolute left-4 top-4 text-gray-400 dark:text-gray-500" size={18} />
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Nombre"
                      value={datos.nombre}
                      onChange={manejarCambio}
                      className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                      required
                    />
                  </div>

                  <div className="relative">
                    <User className="absolute left-4 top-4 text-gray-400 dark:text-gray-500" size={18} />
                    <input
                      type="text"
                      name="apellido"
                      placeholder="Apellido/s"
                      value={datos.apellido}
                      onChange={manejarCambio}
                      className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-4 text-gray-400 dark:text-gray-500" size={18} />
                    <input
                      type="email"
                      name="email"
                      placeholder="Correo electrónico"
                      value={datos.email}
                      className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none opacity-50 cursor-not-allowed"
                      disabled
                    />
                  </div>

                  <div className="relative">
                    <IdCard className="absolute left-4 top-4 text-gray-400 dark:text-gray-500" size={18} />
                    <input
                      type="text"
                      name="dni"
                      placeholder="DNI / Documento"
                      value={datos.dni}
                      onChange={manejarCambio}
                      className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                    />
                  </div>

                  <div className="relative md:col-span-2">
                    <MapPin className="absolute left-4 top-4 text-gray-400 dark:text-gray-500" size={18} />
                    <input
                      type="text"
                      name="direccion"
                      placeholder="Dirección de envío completa (Calle, Altura, Piso, Ciudad)"
                      value={datos.direccion}
                      onChange={manejarCambio}
                      className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                    />
                  </div>

                </div>

                <div className="flex justify-end mt-4">
                  <button 
                    type="submit" 
                    disabled={cargando}
                    className="bg-[#4e7ef0] hover:bg-blue-600 disabled:bg-gray-500 text-white py-3.5 px-6 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    <Save size={18} /> {cargando ? 'Guardando...' : 'Guardar Datos'}
                  </button>
                </div>
              </form>
            )}

            {pestanaActiva === 'facturas' && (
              <div className="flex flex-col gap-4">
                <div className="bg-blue-50 dark:bg-blue-500/5 border border-blue-200/50 dark:border-blue-500/10 p-4 rounded-2xl text-sm text-blue-700 dark:text-blue-400 font-medium">
                  🚀 Espacio preparado para la automatizacion automatica de tus compras y descarga de PDF
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-black/10 rounded-xl">
                      <tr>
                        <th className="px-4 py-3 rounded-l-xl">Nro Comprobante</th>
                        <th className="px-4 py-3">Fecha</th>
                        <th className="px-4 py-3">Total</th>
                        <th className="px-4 py-3 rounded-r-xl">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                      {facturasSimuladas.map((fac) => (
                        <tr key={fac.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                          <td className="px-4 py-4 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <FileText size={16} className="text-gray-400" /> {fac.id}
                          </td>
                          <td className="px-4 py-4">{fac.fecha}</td>
                          <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">${fac.total.toLocaleString()}</td>
                          <td className="px-4 py-4">
                            <span className="bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs px-2.5 py-1 rounded-full font-bold">
                              {fac.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <Chatbot />
    </>
  )
}