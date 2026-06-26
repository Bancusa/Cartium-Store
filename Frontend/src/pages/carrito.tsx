import { useContext, useEffect } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Chatbot from '../components/Chatbot'

const Carrito = () => {
  const context = useContext(CartContext)
  const carrito = context?.carrito || []
  const total = carrito.reduce((acumulador, item) => acumulador + Number(item.precio), 0)

  // automatizacion del pago post login
  useEffect(() => {
    const tokenActivo = localStorage.getItem('token')
    const pagoPendiente = localStorage.getItem('pagoPendiente')

    if (tokenActivo && pagoPendiente === 'true' && carrito.length > 0) {
      localStorage.removeItem('pagoPendiente')
      // eslint-disable-next-line
      procesarPago()
    }
  }, [carrito])

  const procesarPago = async () => {
    const tokenBruto = localStorage.getItem('token')
    
    // Filtro: Si es nulo, vacio o dice "undefined", lo descartamos
    const tokenActivo = (tokenBruto && tokenBruto !== 'undefined' && tokenBruto !== 'null' && tokenBruto.trim() !== '') ? tokenBruto : null

    if (!tokenActivo) {
      localStorage.removeItem('token')
      localStorage.setItem('ultimaRuta', '/carrito')
      // eslint-disable-next-line
      window.location.href = '/auth'
      return
    }

    try {
      const emailActivo = localStorage.getItem('emailUsuario')
      const fechaActual = new Date().toLocaleDateString('es-AR')

      // disparamos el registro de la factura de forma asincrona
      if (emailActivo) {
        await fetch('http://localhost:4000/api/pagos/guardar-factura', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailActivo,
            total: total,
            estado: 'Procesando',
            fecha: fechaActual
          })
        })
      }

      const itemsMP = carrito.map(item => ({
        title: item.nombre,
        unit_price: Number(item.precio),
        quantity: 1 
      }))

      const respuesta = await fetch('http://localhost:4000/api/pagos/crear-preferencia', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenActivo}`
        },
        body: JSON.stringify({ items: itemsMP })
      })

      const data = await respuesta.json()

      if (data.init_point) {
        // eslint-disable-next-line
        window.location.href = data.init_point
      } else {
        console.error("Error desde el backend al generar la preferencia", data)
      }

    } catch (error) {
      console.error("Fallo de red al conectar con la pasarela", error)
    }
  }

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f11] text-gray-900 dark:text-white p-8 transition-colors duration-300">
        <div className="max-w-3xl mx-auto mt-10">
          
          {carrito.length === 0 ? (
            <div className="bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/5 rounded-3xl p-16 text-center shadow-xl transition-colors duration-300">
              <svg className="w-20 h-20 mx-auto text-gray-400 dark:text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <h2 className="text-2xl font-bold mb-2">Tu carrito esta vacio</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">Parece que todavia no sumaste nada para tu carrito</p>
              
              <Link to="/catalogo" className="inline-block mt-6 bg-[#fb4f52] hover:bg-red-500 text-white font-bold py-3 px-8 rounded-xl transition-all">
                Ir a comprar
              </Link>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/5 rounded-3xl p-8 shadow-xl transition-colors duration-300">
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-white/10 pb-4">Tus Productos</h2>
              
              <div className="flex flex-col gap-4 mb-8">
                {carrito.map((item, index) => (
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

                <button 
                  onClick={procesarPago}
                  disabled={carrito.length === 0}
                  className="bg-[#5c8aff] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-10 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 w-full sm:w-auto cursor-pointer"
                >
                  Proceder al pago
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