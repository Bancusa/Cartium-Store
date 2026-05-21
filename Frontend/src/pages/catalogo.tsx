import { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import Navbar from '../components/Navbar'

// datos de ejemplo basados en los productos de la tienda
const listaProductos = [
  { id: '1', nombre: 'mancuerna 5kg', precio: 12500, descripcion: 'Mancuerna de fundicion ideal para entrenamiento en casa' },
  { id: '2', nombre: 'mancuerna 15kg', precio: 25000, descripcion: 'Mancuerna pesada para ejercicios de fuerza compuestos' },
]

const Catalogo = () => {
  const context = useContext(CartContext)
  const [busqueda, setBusqueda] = useState('')

  // filtramos los productos segun lo que escriba el usuario
  const productosFiltrados = listaProductos.filter(item =>
    item.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <>
      <Navbar />
      
      {/* contenedor principal del catalogo adaptable a modo claro y oscuro */}
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f11] text-gray-900 dark:text-white p-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto mt-6">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <span className="text-sm font-bold text-[#5c8aff] tracking-wider uppercase">Equipamiento 2026</span>
              <h1 className="text-4xl font-black mt-1">Entrena a otro nivel</h1>
            </div>

            {/* barra de busqueda estilizada para ambos modos */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-white dark:bg-[#1a1a1c] text-gray-900 dark:text-white pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-[#5c8aff] transition-all text-sm"
              />
            </div>
          </div>

          {/* grilla de productos responsiva */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productosFiltrados.map((item) => (
              // tarjeta de producto con animaciones de escala y colores hibridos
              <div key={item.id} className="bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/10 rounded-3xl p-6 hover:shadow-xl dark:hover:bg-white/5 transition-all group flex flex-col justify-between duration-300">
                
                <div>
                  {/* contenedor simulado para la foto del producto */}
                  <div className="w-full h-48 bg-gray-100 dark:bg-[#0f0f11] rounded-2xl flex items-center justify-center border border-gray-200 dark:border-white/5 relative overflow-hidden mb-4 transition-colors duration-300">
                    <span className="text-gray-400 dark:text-gray-600 text-sm font-medium">Foto {item.nombre}</span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight mb-1">{item.nombre}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">{item.descripcion}</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-2xl font-black text-[#5c8aff]">
                      ${item.precio.toLocaleString('es-AR')}
                    </span>
                  </div>

                  {/* boton interactivo con efectos de escala y sombreado dinamico */}
                  <button
                    className="w-full bg-[#5c8aff] text-white font-bold py-3 mt-4 rounded-xl transition-all duration-200 hover:bg-blue-600 hover:scale-[1.03] active:scale-95 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClick={() => context?.agregarAlCarrito(item as any)}
                  >
                    Agregar al carrito
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default Catalogo