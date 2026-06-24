import { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Chatbot from '../components/Chatbot';

const Carrito = () => {
  const context = useContext(CartContext)
  const carrito = context?.carrito || []

  // calculamos el total sumando los precios de los productos
  const total = carrito.reduce((acumulador, item) => acumulador + Number(item.precio), 0)

  // estados locales para capturar los datos de facturacion del cliente
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [dni, setDni] = useState('')
  const [direccion, setDireccion] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  
  // estado nuevo para controlar la visibilidad de la contraseña
  const [verPassword, setVerPassword] = useState(false)

  // funcion para mandar los fierros a la pasarela de pagos
  const procesarPago = async () => {
    if (!mostrarFormulario) {
      setMostrarFormulario(true)
      return
    }

    // validacion basica para evitar campos vacios incluyendo el nuevo campo
    if (!nombre || !apellido || !dni || !direccion || !email || !password) {
      alert('Por favor, completa todos tus datos de registro antes de continuar al pago.')
      return
    }

    try {
      const itemsMP = carrito.map(item => ({
        title: item.nombre,
        unit_price: Number(item.precio),
        quantity: 1 
      }))

      // despachamos los productos junto con los datos del comprador recopilados con la clave
      const respuesta = await fetch('http://localhost:4000/api/pagos/crear-preferencia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: itemsMP })
      })

      const data = await respuesta.json()
      if (data.init_point) {
        window.location.href = data.init_point
      }

      if (data.init_point) {
        window.location.href = data.init_point
      } else {
        console.error("No se recibio el punto de inicio", data)
      }

    } catch (error) {
      console.error("Error al conectar con la pasarela de pagos:", error)
    }
  }

  return (
    <>
      <Navbar />
      
      {/* contenedor principal adaptado para modo claro y oscuro */}
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f11] text-gray-900 dark:text-white p-8 transition-colors duration-300">
        <div className="max-w-3xl mx-auto mt-10">
          
          {carrito.length === 0 ? (
            // tarjeta de carrito vacio con soporte para los dos modos
            <div className="bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/5 rounded-3xl p-16 text-center shadow-xl transition-colors duration-300">
              <svg className="w-20 h-20 mx-auto text-gray-400 dark:text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <h2 className="text-2xl font-bold mb-2">Tu carrito esta vacio</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">Parece que todavia no sumaste nada para tu carrito</p>
              
              <Link to="/catalogo" className="inline-block mt-6 bg-[#fb4f52] hover:bg-red-500 text-white font-bold py-3 px-8 rounded-xl transition-all">
                Ir a comprar
              </Link>
            </div>
          ) : (
            // contenedor del listado de productos
            <div className="bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/5 rounded-3xl p-8 shadow-xl transition-colors duration-300">
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-white/10 pb-4">Tus Productos</h2>
              
              <div className="flex flex-col gap-4 mb-8">
                {carrito.map((item, index) => (
                  // tarjeta individual de cada producto
                  <div key={index} className="flex justify-between items-center bg-gray-100 dark:bg-[#0f0f11] p-4 rounded-xl border border-gray-200 dark:border-white/5 transition-colors duration-300">
                    <span className="font-semibold text-lg">{item.nombre}</span>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-[#5c8aff] font-bold text-xl">
                        ${Number(item.precio).toLocaleString('es-AR')}
                      </span>
                      
                      <button 
                        onClick={() => context?.eliminarDelCarrito(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-white/5"
                        title="Eliminar producto"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* seccion dinamica de registro obligatorio antes de pagar */}
              {mostrarFormulario && (
                <div className="flex flex-col gap-3 mb-6 p-6 bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/10 rounded-2xl transition-all duration-300">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5c8aff]">Datos de registro y envio</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full bg-white dark:bg-[#1a1a1c] text-gray-900 dark:text-white px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-[#5c8aff] text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Apellido"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      className="w-full bg-white dark:bg-[#1a1a1c] text-gray-900 dark:text-white px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-[#5c8aff] text-sm"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="DNI (Sin puntos)"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    className="w-full bg-white dark:bg-[#1a1a1c] text-gray-900 dark:text-white px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-[#5c8aff] text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Direccion de entrega"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    className="w-full bg-white dark:bg-[#1a1a1c] text-gray-900 dark:text-white px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-[#5c8aff] text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email de contacto"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white dark:bg-[#1a1a1c] text-gray-900 dark:text-white px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-[#5c8aff] text-sm"
                  />
                  
                  {/* contenedor del input de contraseña con el boton de ver/ocultar integrado */}
                  <div className="relative w-full flex items-center">
                    <input
                      type={verPassword ? "text" : "password"}
                      placeholder="Elegi una contraseña para tu cuenta"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white dark:bg-[#1a1a1c] text-gray-900 dark:text-white px-4 py-2.5 pr-12 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-[#5c8aff] text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setVerPassword(!verPassword)}
                      className="absolute right-4 text-gray-400 hover:text-[#5c8aff] dark:hover:text-white transition-colors focus:outline-none cursor-pointer"
                      title={verPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {verPassword ? (
                        // icono de ojo tachado (ocultar)
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                      ) : (
                        // icono de ojo (mostrar)
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* seccion inferior con el total estimado */}
              <div className="mt-6 bg-gray-100 dark:bg-[#0f0f11] p-6 rounded-xl border border-gray-200 dark:border-white/10 flex justify-between items-center transition-colors duration-300">
                <span className="text-xl text-gray-500 dark:text-gray-300 font-semibold">Total estimado</span>
                <span className="text-3xl font-black text-[#5c8aff]">
                  ${total.toLocaleString('es-AR')}
                </span>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <Link to="/catalogo" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-semibold transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Seguir comprando
                </Link>

                {/* boton adaptado que cambia de texto segun el paso */}
                <button 
                  onClick={procesarPago}
                  disabled={carrito.length === 0}
                  className="bg-[#5c8aff] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-10 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 w-full sm:w-auto"
                >
                  {mostrarFormulario ? 'Confirmar y pagar' : 'Proceder al pago'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
      <Chatbot />
    </>
  )
}

export default Carrito