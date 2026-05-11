import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import Navbar from '../components/Navbar';

export default function Carrito() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white font-sans w-full flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 pt-20">
        
        {/* Contenedor del carrito vacio */}
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-[32px] shadow-2xl flex flex-col items-center text-center">
          
          <ShoppingCart size={80} className="text-gray-500 mb-8" />
          
          <h2 className="text-3xl font-black mb-4">
            Tu carrito está vacío
          </h2>
          
          <p className="text-gray-400 text-lg">
            Parece que todavía no sumaste nada para tu carrito.
          </p>
          
          <Link 
            to="/catalogo" 
            className="mt-12 bg-[#f04e4e] hover:bg-[#d64545] text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-red-500/20 text-lg hover:scale-105 active:scale-95"
          >
            Ir a comprar
          </Link>

        </div>
      </main>
      <Chatbot />
    </div>
  );
}