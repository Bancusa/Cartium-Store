import { useState } from 'react';
import { Filter, ChevronDown, Search, X } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function Catalogo() {
  const [mostrarFiltros, setMostrarFiltros] = useState(true);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white font-sans w-full flex flex-col">
      
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENIDO PRINCIPAL */}
      <main className="w-full px-6 md:px-10 pt-36 pb-12 flex flex-col md:flex-row gap-8 flex-1">
        
        {/* COLUMNA IZQUIERDA: FILTROS */}
        {mostrarFiltros && (
          <aside className="w-full md:w-1/4 lg:w-1/5 shrink-0 flex flex-col gap-8 transition-all duration-300">
            
            {/* Buscador */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar equipamiento..." 
                className="w-full bg-[#1A1D24] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
              />
              <Search size={16} className="absolute left-4 top-3.5 text-gray-400" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-300 mb-4 flex items-center justify-between cursor-pointer hover:text-white transition-colors">
                Categorías <ChevronDown size={16} />
              </h3>
              <div className="flex flex-col gap-3">
                {['Pesas y Discos', 'Barras Olímpicas', 'Mancuernas', 'Accesorios', 'Máquinas', 'Cardio'].map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-transparent text-[#4e7ef0] focus:ring-[#4e7ef0] focus:ring-offset-[#0B0C10]" />
                    <span className="text-gray-400 group-hover:text-white transition-colors text-sm">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-300 mb-4 flex items-center justify-between cursor-pointer hover:text-white transition-colors">
                Precio <ChevronDown size={16} />
              </h3>
              <div className="flex flex-col gap-4">
                <input type="range" className="w-full accent-[#4e7ef0]" />
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="Min" className="w-1/2 bg-[#1A1D24] border border-white/5 rounded-lg py-2 px-3 text-sm text-center focus:outline-none focus:border-[#4e7ef0]" />
                  <span className="text-gray-500">-</span>
                  <input type="text" placeholder="Max" className="w-1/2 bg-[#1A1D24] border border-white/5 rounded-lg py-2 px-3 text-sm text-center focus:outline-none focus:border-[#4e7ef0]" />
                </div>
              </div>
            </div>

            {/* BOTONES DE LA BARRA LATERAL */}
            <div className="flex flex-col gap-2 mt-2">
              <button className="w-full bg-transparent border border-transparent hover:border-white/10 hover:bg-white/5 text-gray-400 hover:text-white py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2">
                <X size={16} /> Limpiar Filtros
              </button>
              <button className="w-full bg-[#4e7ef0] hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all text-sm shadow-lg shadow-blue-500/20">
                Aplicar Filtros
              </button>
            </div>
          </aside>
        )}

        {/* COLUMNA DERECHA: GRILLA DE PRODUCTOS */}
        <section className="flex-1 w-full transition-all duration-300">
          
          {/* ENCABEZADO DE LA GRILLA */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b border-white/10 pb-4 gap-4">
            
            {/* 1/3 Izquierdo: Boton Filtros */}
            <div className="w-full md:w-1/3 flex justify-start">
              <button 
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0 border ${
                  mostrarFiltros 
                    ? 'bg-[#4e7ef0] border-[#4e7ef0] text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                }`}
              >
                <Filter size={16} />
                Filtros
              </button>
            </div>

            {/* 1/3 Centro: Titulo */}
            <div className="w-full md:w-1/3 text-center">
              <h1 className="text-3xl font-black mb-1 leading-none">
                Nuestro <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f04e4e] to-[#4e7ef0]">Catálogo</span>
              </h1>
              <p className="text-sm text-gray-500 mt-1">'Descripcion'</p>
            </div>
            
            {/* 1/3 Derecho: Select de Ordenar */}
            <div className="w-full md:w-1/3 flex justify-end">
              <select className="w-full md:w-auto bg-[#1A1D24] border border-white/5 rounded-xl py-2.5 px-4 text-sm text-gray-300 focus:outline-none focus:border-[#4e7ef0] cursor-pointer appearance-none">
                <option value="destacados">Ordenar por: Destacados</option>
                <option value="menor">Menor precio</option>
                <option value="mayor">Mayor precio</option>
              </select>
            </div>
          </div>
          
          {/* GRILLA (3 por fila en desktop - 1 por telefono) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="h-80 bg-[#12141A] rounded-2xl border border-white/5 shadow-lg flex flex-col justify-end p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
                <div className="w-3/4 h-6 bg-white/10 rounded mb-3 relative z-10"></div>
                <div className="w-1/2 h-4 bg-white/5 rounded relative z-10"></div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}