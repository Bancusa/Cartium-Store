import { useContext, useState, useEffect } from 'react'
import { CartContext } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Chatbot from '../components/Chatbot'

// interfaz para el producto de la base de datos
interface ProductoDB {
  id: number
  nombre: string
  descripcion: string
  precio: number
  stock: number
}

const Catalogo = () => {
  const context = useContext(CartContext)
  
  // estados para los filtros y el menu desplegable
  const [busqueda, setBusqueda] = useState('')
  const [orden, setOrden] = useState('defecto')
  const [conStock, setConStock] = useState(false)
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false)

  const [productos, setProductos] = useState<ProductoDB[]>([])
  const [cargando, setCargando] = useState(true)
  
  // estado para controlar la pagina actual de la paginacion
  const [paginaActual, setPaginaActual] = useState(1)
  
  // limitamos la vista a 9 para formar una grilla perfecta de 3x3
  const productosPorPagina = 9

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await fetch('/api/productos/getAll')
        const datos = await respuesta.json()

        if (Array.isArray(datos)) {
          setProductos(datos)
        } else {
          console.error('El backend contesto pero no es un array:', datos)
          setProductos([])
        }
      } catch (error) {
        console.error('error al cargar los productos', error)
        setProductos([])
      } finally {
        setCargando(false)
      }
    }
    obtenerProductos()
  }, [])

  // reseteamos a la pagina 1 cada vez que el usuario escribe un filtro nuevo
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPaginaActual(1)
  }, [busqueda, orden, conStock])

  let productosFiltrados = productos.filter(item =>
    item.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  if (conStock) {
    productosFiltrados = productosFiltrados.filter(item => item.stock > 0)
  }

  if (orden === 'menor') {
    productosFiltrados.sort((a, b) => a.precio - b.precio)
  } else if (orden === 'mayor') {
    productosFiltrados.sort((a, b) => b.precio - a.precio)
  } else if (orden === 'az') {
    productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre))
  }

  // calculamos los indices exactos para segmentar el array en paginas
  const indiceUltimoProducto = paginaActual * productosPorPagina
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina
  const productosPaginados = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto)

  // calculo de la cantidad total de paginas necesarias
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina)

  const cambiarPagina = (numeroPagina: number) => {
    setPaginaActual(numeroPagina)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderizarFiltros = () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold uppercase tracking-wider opacity-50">Buscar</span>
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input
            type="text"
            placeholder="Escriba aqui..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-white dark:bg-[#1a1a1c] text-gray-900 dark:text-white pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-[#5c8aff] transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold uppercase tracking-wider opacity-50">Ordenamiento</span>
        <select 
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="w-full bg-white dark:bg-[#1a1a1c] text-gray-900 dark:text-white px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-[#5c8aff] transition-all text-sm cursor-pointer"
        >
          <option value="defecto">Seleccionar...</option>
          <option value="menor">Menor precio</option>
          <option value="mayor">Mayor precio</option>
          <option value="az">Nombre A-Z</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold uppercase tracking-wider opacity-50">Disponibilidad</span>
        <label className="flex items-center gap-2 text-sm font-medium cursor-pointer p-1">
          <input 
            type="checkbox" 
            checked={conStock}
            onChange={(e) => setConStock(e.target.checked)}
            className="w-4 h-4 accent-[#5c8aff] rounded cursor-pointer"
          />
          Solo disponibles
        </label>
      </div>
    </div>
  )

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f11] text-gray-900 dark:text-white p-8 transition-colors duration-300">
        <div className="w-[95%] mx-auto mt-6 flex flex-col lg:flex-row gap-8">
          
          <aside className="hidden lg:block w-64 shrink-0 bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/10 rounded-3xl p-6 h-fit sticky top-24">
            <h2 className="text-lg font-bold mb-6">Filtros</h2>
            {renderizarFiltros()}
          </aside>

          <div className="lg:hidden w-full mb-2">
            <button 
              onClick={() => setFiltrosAbiertos(!filtrosAbiertos)}
              className="w-full bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/10 text-sm font-bold py-3 px-4 rounded-xl flex justify-between items-center"
            >
              <span>{filtrosAbiertos ? 'Ocultar filtros' : 'Filtrar y ordenar'}</span>
              <svg className={`w-5 h-5 transition-transform ${filtrosAbiertos ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>

            {filtrosAbiertos && (
              <div className="mt-4 p-6 bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg">
                {renderizarFiltros()}
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div className="text-center sm:text-left w-full sm:w-auto">
                  <span className="text-sm font-bold text-[#5c8aff] tracking-wider uppercase">
                    Equipamiento 2026
                  </span>
                  <h1 className="text-4xl font-black mt-1">
                    Entrena a otro nivel
                  </h1>
                </div>
              </div>

              {cargando ? (
                <div className="text-center py-20 text-xl font-bold text-gray-500">
                  Cargando catalogo
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productosPaginados.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-gray-500 font-medium">
                      No se encontraron productos con estos filtros
                    </div>
                  ) : (
                    productosPaginados.map((item) => (
                      <div key={item.id} className="bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/10 rounded-3xl p-6 hover:shadow-xl dark:hover:bg-white/5 transition-all group flex flex-col justify-between duration-300">
                        <div>
                          <div className="w-full aspect-square bg-gray-100 dark:bg-[#0f0f11] rounded-2xl flex items-center justify-center border border-gray-200 dark:border-white/5 relative overflow-hidden mb-4 transition-colors duration-300">
                            <span className="text-gray-400 dark:text-gray-600 text-sm font-medium">Foto {item.nombre}</span>
                          </div>

                          <h3 className="text-xl font-bold tracking-tight mb-1">{item.nombre}</h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">{item.descripcion}</p>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-2xl font-black text-[#5c8aff]">
                              ${Number(item.precio).toLocaleString('es-AR')}
                            </span>
                            <span className={`text-xs font-bold px-2 py-1 rounded-md ${item.stock === 0 ? 'text-gray-500 bg-gray-100 dark:bg-gray-800' : 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30'}`}>
                              Stock: {item.stock} u.
                            </span>
                          </div>

                          <button
                            disabled={item.stock === 0}
                            className={`w-full font-bold py-3 mt-4 rounded-xl transition-all duration-200 shadow-lg ${item.stock === 0 ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed shadow-none' : 'bg-[#5c8aff] text-white hover:bg-blue-600 hover:scale-[1.03] active:scale-95 shadow-blue-500/10 hover:shadow-blue-500/30 cursor-pointer'}`}
                            onClick={() => context?.agregarAlCarrito({
                              id: String(item.id),
                              nombre: item.nombre,
                              precio: item.precio
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            } as any)}
                          >
                            {item.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* controles de paginacion inferiores */}
            {!cargando && totalPaginas > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
                <button
                  onClick={() => cambiarPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                  className="px-4 py-2 text-sm font-bold bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/10 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-[#232326] transition-all cursor-pointer"
                >
                  Anterior
                </button>

                {Array.from({ length: totalPaginas }, (_, index) => {
                  const numero = index + 1;
                  return (
                    <button
                      key={numero}
                      onClick={() => cambiarPagina(numero)}
                      className={`w-10 h-10 text-sm font-bold rounded-xl transition-all cursor-pointer ${paginaActual === numero ? 'bg-[#5c8aff] text-white shadow-lg shadow-blue-500/20' : 'bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-[#232326]'}`}
                    >
                      {numero}
                    </button>
                  );
                })}

                <button
                  onClick={() => cambiarPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                  className="px-4 py-2 text-sm font-bold bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/10 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-[#232326] transition-all cursor-pointer"
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
      <Chatbot />
    </>
  )
}

export default Catalogo