import { Link } from 'react-router-dom';
import { ShoppingCart, User, Home, LayoutGrid } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6 w-full bg-[#0B0C10]/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f04e4e] to-[#4e7ef0]"></div>
        <span className="font-bold text-xl text-white">Cartium Store</span>
      </div>
      
      <div className="hidden md:flex gap-4">
        <Link to="/" className="flex items-center gap-2 bg-[#4e7ef0] px-6 py-2.5 rounded-full text-sm font-medium text-white shadow-lg shadow-blue-500/20 hover:scale-105 transition-all">
          <Home size={16} /> Inicio
        </Link>
        <Link to="/catalogo" className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full text-sm font-medium text-white hover:bg-white/10 transition-all hover:scale-105">
          <LayoutGrid size={16} /> Catálogo
        </Link>
      </div>

      <div className="flex gap-6 items-center">
        <Link to="/auth" className="text-gray-300 hover:text-white transition flex items-center gap-2 text-sm font-medium">
          <User size={16} /> Iniciar Sesión
        </Link>
        <Link to="/carrito" className="bg-[#4e7ef0] px-6 py-2.5 rounded-full text-sm font-medium text-white flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-105 transition-all">
          <ShoppingCart size={16} /> Carrito
        </Link>
      </div>
    </nav>
  );
}