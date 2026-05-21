import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext'; // Importamos el tema

const Navbar = () => {
  const [abierto, setAbierto] = useState(false);
  const { theme, toggleTheme } = useTheme(); // Usamos el tema
  const context = useContext(CartContext);
  const cantidad = context?.cantidadTotal || 0;

  return (
    // Cambiamos bg-[#0f0f11] por bg-white y dark:bg-[#0f0f11]
    <nav className="bg-white dark:bg-[#0f0f11] text-gray-900 dark:text-white p-4 border-b border-gray-200 dark:border-white/5 relative z-50 transition-colors duration-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto relative">
        
        {/* LOGO */}
        <div className="flex items-center gap-3 flex-1">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain rounded-lg" />
          <Link to="/" className="text-xl font-bold tracking-wide">Cartium Store</Link>
        </div>

        {/* CENTRO (Escritorio) */}
        <div className="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
          {/* BOTÓN THEME TOGGLE */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all mr-2"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <Link to="/" className="bg-[#5c8aff] text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold shadow-lg shadow-blue-500/20">
            Inicio
          </Link>
          
          <Link to="/catalogo" className="bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-[#5c8aff] px-5 py-2.5 rounded-full text-sm font-bold transition-all border border-transparent dark:border-white/5">
            Catálogo
          </Link>
        </div>

        {/* DERECHA (Escritorio) */}
        <div className="hidden md:flex items-center gap-4 justify-end flex-1">
           <Link to="/carrito" className="relative p-2 bg-gray-100 dark:bg-white/5 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            {cantidad > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full animate-bounce">{cantidad}</span>}
          </Link>
          <Link to="/login" className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity">Iniciar Sesión</Link>
        </div>

        {/* CELULAR */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2">{theme === 'dark' ? '☀️' : '🌙'}</button>
          <button onClick={() => setAbierto(!abierto)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2} /></svg>
          </button>
        </div>
      </div>
      
      {/* ... (El menú móvil también debería tener bg-white dark:bg-[#0f0f11]) */}
    </nav>
  );
};
export default Navbar;