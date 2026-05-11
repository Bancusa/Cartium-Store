import { useState, useEffect } from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import Chatbot from '../components/Chatbot';
import Navbar from '../components/Navbar';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

export default function Catalogo() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // URL del backend
    fetch('http://localhost:4000/products') 
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('El servidor tiró un error');
        }
        return respuesta.json();
      })
      .then((datos) => {
        setProductos(datos); // Guardamos las mancuernas en el estado
        setCargando(false);
      })
      .catch((error) => {
        console.error("Ups, falló la conexión con el servidor:", error);
        setCargando(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white font-sans w-full flex flex-col">
      <Navbar />

      <main className="flex-1 px-8 md:px-16 pt-28 pb-20 max-w-7xl mx-auto w-full">
        
        {/* Cabecera del catalogo */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h1 className="text-4xl md:text-5xl font-black">Catálogo de <span className="text-[#4e7ef0]">Equipamiento</span></h1>
          
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
            <input 
              type="text" 
              placeholder="Buscar productos..." 
              className="w-full md:w-80 bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
            />
          </div>
        </div>

        {/* 4. Grilla de productos dinamica */}
        {cargando ? (
          <div className="text-center text-gray-400 mt-20 text-xl font-bold animate-pulse">
            Cargando el peso pesado...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productos.length > 0 ? (
              productos.map((item) => (
                <div key={item.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all group flex flex-col">
                  
                  {/* Placeholder de imagen */}
                  <div className="w-full h-48 bg-gradient-to-br from-black/40 to-black/10 rounded-2xl mb-6 flex items-center justify-center border border-white/5 group-hover:scale-[1.02] transition-all">
                    <span className="text-gray-600 font-medium">Foto {item.nombre}</span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{item.nombre}</h3>
                    {/* Formateamos el precio para que se vea con el signo peso */}
                    <p className="text-[#4e7ef0] font-black text-xl mb-6">
                      ${item.precio.toLocaleString('es-AR')}
                    </p>
                  </div>
                  
                  <button className="w-full bg-white/10 hover:bg-[#4e7ef0] text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                    <ShoppingCart size={18} /> Agregar
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 mt-10">
                <p>No se encontraron productos</p>
              </div>
            )}
          </div>
        )}
      </main>
      <Chatbot />
    </div>
  );
}