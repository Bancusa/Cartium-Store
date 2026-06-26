import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useState, useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext' 

const Navbar = () => {
  const [abierto, setAbierto] = useState(false)
  const { theme, toggleTheme } = useTheme() 
  const context = useContext(CartContext)
  const cantidad = context?.cantidadTotal || 0

  const [nombreUsuario] = useState<string | null>(() => {
    const nombre = localStorage.getItem('nombreUsuario')
    return nombre ? nombre.split(' ')[0] : null
  })

  const cerrarSesion = () => {
    const temaGuardado = localStorage.getItem('theme')
    localStorage.clear()
    if (temaGuardado) {
      localStorage.setItem('theme', temaGuardado)
    }
    window.location.href = '/' 
  }

  return (
    <nav className="bg-white dark:bg-[#0f0f11] text-gray-900 dark:text-white p-4 border-b border-gray-200 dark:border-white/5 sticky top-0 z-50 transition-colors duration-300">
      <div className="flex justify-between items-center w-[95%] mx-auto relative">
        
        {/* marca y logo principal */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Cartium Logo" className="h-8 w-auto object-contain" />
            <span className="font-black text-xl tracking-wider">CARTIUM STORE</span>
          </Link>
        </div>

        {/* menu de navegacion para pantallas de escritorio */}
        <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-wide">
          <Link to="/catalogo" className="hover:text-[#5c8aff] transition-colors">Catálogo</Link>
          <Link to="/carrito" className="relative flex items-center gap-1.5 hover:text-[#5c8aff] transition-colors">
            Carrito
            {cantidad > 0 && (
              <span className="bg-[#5c8aff] text-white text-[10px] px-1.5 py-0.5 rounded-full font-black min-w-4.5 text-center">
                {cantidad}
              </span>
            )}
          </Link>

          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all cursor-pointer"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {nombreUsuario ? (
            <div className="flex items-center gap-4 border-l border-gray-200 dark:border-white/10 pl-6">
              <span className="text-gray-500 dark:text-gray-400">
                Hola <Link to="/perfil" className="text-[#5c8aff] font-black hover:underline cursor-pointer">{nombreUsuario}</Link>
              </span>
              <button 
                onClick={cerrarSesion}
                className="bg-red-500/10 hover:bg-red-500 text-red-600 dark:text-red-400 px-4 py-2 rounded-xl transition-all cursor-pointer text-xs font-black"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <Link 
              to="/auth" 
              onClick={() => localStorage.setItem('ultimaRuta', window.location.pathname)}
              className="bg-[#5c8aff] hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/10"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>

        {/* boton de menu hamburguesa para pantallas moviles */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleTheme} className="p-2 text-lg">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button 
            onClick={() => setAbierto(!abierto)} 
            className="text-gray-500 dark:text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {abierto ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* desplegable mobile */}
      {abierto && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0f0f11] border-b border-gray-200 dark:border-white/5 flex flex-col items-center gap-5 py-6 font-bold shadow-xl transition-all z-50">
          <Link to="/catalogo" onClick={() => setAbierto(false)} className="text-lg font-bold tracking-wide">Catálogo</Link>
          <Link to="/carrito" onClick={() => setAbierto(false)} className="text-lg font-bold tracking-wide relative flex items-center gap-2">
            Carrito
            {cantidad > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{cantidad}</span>}
          </Link>
          
          {nombreUsuario ? (
            <div className="flex flex-col items-center gap-4 mt-2 w-full px-6">
              <span className="text-lg font-bold tracking-wide border-t border-gray-200 dark:border-white/10 pt-6 w-full text-center">
                Hola <span className="text-[#5c8aff]">{nombreUsuario}</span>
              </span>
              <button 
                onClick={cerrarSesion}
                className="text-md font-bold text-red-500 tracking-wide cursor-pointer"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <Link 
              to="/auth" 
              onClick={() => {
                setAbierto(false)
                localStorage.setItem('ultimaRuta', window.location.pathname)
              }} 
              className="text-lg font-bold tracking-wide opacity-70 mt-2 text-[#5c8aff]"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar