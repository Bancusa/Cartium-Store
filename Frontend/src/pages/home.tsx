import { type LucideIcon, ShieldCheck, Zap, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  text: string;
  color: string;
}

const FeatureCard = ({ icon: Icon, title, text, color }: FeatureProps) => (
  <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition-all">
    <div className={`p-4 rounded-full mb-6 ${color} bg-opacity-20`}>
      <Icon size={32} className={color.replace('bg-', 'text-')} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white">
      {/* 1. NAVBAR */}
      <Navbar />

      {/* 2. HERO SECTION */}
      <main className="w-full max-w-7xl mx-auto px-8 md:px-16 pt-32 pb-20 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* Lado Izquierdo: Textos */}
        <div className="flex-1 text-left flex flex-col items-start">
          
          {/* Etiqueta "Equipamiento 2026" */}
          <div className="inline-flex items-center gap-3 border border-white/10 bg-black/20 backdrop-blur-md rounded-full px-6 py-2.5 text-base md:text-lg font-medium text-gray-200 mb-8 shadow-xl">
             <span className="text-blue-400 text-xl">📈</span> Equipamiento 2026
          </div>
          
          {/* Título */}
          <h1 className="text-7xl md:text-9xl font-black leading-tight mb-6 drop-shadow-2xl">
            Entrena <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b6b] to-[#749bff]">
              Sin Límites
            </span>
          </h1>
          
          {/* Párrafo con mb-10 para separar */}
          <p className="text-gray-300 text-xl md:text-2xl max-w-2xl leading-relaxed mb-10 drop-shadow-md">
            Bienvenido a Cartium Store. El mejor equipamiento profesional para llevar tu rendimiento al siguiente nivel. Descubre nuestra selección premium de productos de gimnasio.
          </p>
          
          {/* Botón convertido en Link al Catálogo con mt-6 para forzar la separación */}
          <Link 
            to="/catalogo" 
            className="mt-6 inline-block bg-[#f04e4e] hover:bg-[#d64545] text-white px-12 py-5 rounded-2xl font-black transition-all shadow-2xl shadow-red-500/30 text-xl hover:scale-105"
          >
            Comprar Ahora
          </Link>
        </div>

        {/* Lado Derecho: Imagen */}
        <div className="flex-1 flex justify-center md:justify-center mt-12 md:mt-0">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-br from-[#f04e4e] to-[#4e7ef0] rounded-[32px] blur-3xl opacity-30"></div>
            <img 
              src="" 
              alt="Mancuernas" 
              className="relative rounded-[24px] w-[450px] h-[600px] object-cover border border-white/20 shadow-2xl"
            />
          </div>
        </div>
      </main>

      {/* 3. SECCION BENEFICIOS */}
      <section className="w-full px-8 md:px-16 py-32 bg-black/10 border-t border-white/5 backdrop-blur-sm">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black mb-4 drop-shadow-lg">¿Por Qué Elegirnos?</h2>
          <p className="text-gray-300 italic text-lg">Compromiso con la calidad y tu satisfacción</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <FeatureCard 
            icon={Zap} 
            title="Calidad Premium" 
            text="Productos certificados y testeados por profesionales"
            color="bg-cyan-500"
          />
          <FeatureCard 
            icon={ShieldCheck} 
            title="Garantía Extendida" 
            text="Todos nuestros productos incluyen garantía de por vida"
            color="bg-purple-500"
          />
          <FeatureCard 
            icon={Leaf} 
            title="Sostenibilidad" 
            text="Compromiso con el medio ambiente y producción responsable"
            color="bg-blue-500"
          />
        </div>

        {/* 4. BANNER CTA */}
        <div className="relative rounded-3xl py-20 px-10 md:px-16 text-center overflow-hidden border border-white/20 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-black/50 to-blue-600/20 opacity-90"></div>
          <div className="relative z-10 flex flex-col items-center gap-10">
            <h2 className="text-4xl md:text-5xl font-black">¿Listo para transformar tu entrenamiento?</h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Únete a miles de atletas que confían en Cartium Store para su equipamiento de calidad profesional.
            </p>
            <Link 
              to="/catalogo" 
              className="bg-[#4e7ef0] hover:bg-blue-500 px-12 py-4 rounded-xl font-black text-lg transition-all shadow-xl shadow-blue-500/30 hover:scale-105 inline-block"
            >
              Explorar Catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-black/40 pt-20 pb-10 border-t border-white/10 w-full backdrop-blur-md">
        <div className="w-full px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-left">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f04e4e] to-[#4e7ef0]"></div>
                <span className="font-bold text-xl">Cartium Store</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Equipamiento profesional para alcanzar tus metas.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-sm tracking-widest">Productos</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer transition">Pesas</li>
                <li className="hover:text-white cursor-pointer transition">Barras</li>
                <li className="hover:text-white cursor-pointer transition">Mancuernas</li>
                <li className="hover:text-white cursor-pointer transition">Accesorios</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-sm tracking-widest">Compañía</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer transition">Sobre Nosotros</li>
                <li className="hover:text-white cursor-pointer transition">Contacto</li>
                <li className="hover:text-white cursor-pointer transition">Soporte</li>
                <li className="hover:text-white cursor-pointer transition">FAQ</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-sm tracking-widest">Legal</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer transition">Privacidad</li>
                <li className="hover:text-white cursor-pointer transition">Términos</li>
                <li className="hover:text-white cursor-pointer transition">Envíos</li>
                <li className="hover:text-white cursor-pointer transition">Devoluciones</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-xs">
            © 2026 Cartium Store. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
