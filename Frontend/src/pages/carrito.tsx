import { ShoppingCart, User, LayoutGrid, Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Carrito() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white font-sans w-full flex flex-col">
      
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
          <Link to="/catalogo" className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full hover:bg-white/10 transition text-sm font-medium">
            <LayoutGrid size={16} /> Catálogo
          </Link>
        </div>
        <div className="flex gap-6 items-center">
          <button className="text-gray-300 hover:text-white transition flex items-center gap-2 text-sm font-medium">
            <User size={16} /> Iniciar Sesión
          </button>
          <Link to="/carrito" className="bg-[#4e7ef0] px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg shadow-blue-500/20">
            <ShoppingCart size={16} /> Carrito
          </Link>
        </div>
      </nav>

      {/* CONTENIDO */}
      <main className="w-full px-8 md:px-16 py-32 flex flex-col items-center justify-center">
        <div className="bg-black/20 backdrop-blur-md border border-white/10 p-12 rounded-3xl text-center max-w-2xl w-full shadow-2xl">
          <ShoppingCart size={64} className="mx-auto text-gray-500 mb-6 opacity-50" />
          <h2 className="text-4xl font-bold mb-4 drop-shadow-md">Tu carrito está vacío</h2>
          <p className="text-gray-300 mb-10 text-lg">Parece que todavía no sumaste nada para tu búnker de entrenamiento.</p>
          <Link to="/catalogo" className="bg-[#f04e4e] hover:bg-[#d64545] text-white px-10 py-4 rounded-xl font-bold transition-all shadow-xl shadow-red-500/30 inline-block text-lg">
            Ir a comprar
          </Link>
        </div>
      </main>
    </div>
  );
}