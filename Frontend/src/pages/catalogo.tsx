import { ShoppingCart, User, Home as HomeIcon, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Catalogo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-blue-900 text-white font-sans w-full overflow-hidden">
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 md:px-16 py-6 w-full bg-black/10 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f04e4e] to-[#4e7ef0]"></div>
          <span className="font-bold text-xl">Cartium Store</span>
        </div>
        <div className="hidden md:flex gap-4">
          <Link to="/" className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full hover:bg-white/10 transition text-sm font-medium">
            <HomeIcon size={16} /> Inicio
          </Link>
          <Link to="/catalogo" className="flex items-center gap-2 bg-[#4e7ef0] px-6 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-blue-500/20">
            <LayoutGrid size={16} /> Catálogo
          </Link>
        </div>
        <div className="flex gap-6 items-center">
          <button className="text-gray-300 hover:text-white transition flex items-center gap-2 text-sm font-medium">
            <User size={16} /> Iniciar Sesión
          </button>
          <Link to="/carrito" className="bg-[#4e7ef0] px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-105 transition-all">
            <ShoppingCart size={16} /> Carrito
          </Link>
        </div>
      </nav>

      {/* CONTENIDO */}
      <main className="w-full px-8 md:px-16 py-20">
        <h1 className="text-5xl font-black mb-8 drop-shadow-lg">Nuestro Catálogo</h1>
        <p className="text-gray-300 text-lg mb-12">Equipamiento de alto rendimiento. Elegí tus armas.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Tarjetas de relleno (Skeleton loading) */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="h-80 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 animate-pulse shadow-xl"></div>
          ))}
        </div>
      </main>
    </div>
  );
}