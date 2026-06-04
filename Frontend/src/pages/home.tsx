import { type LucideIcon, ShieldCheck, Zap, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Chatbot from '../components/Chatbot';
import logo from '../assets/logo.png';
import principal from '../assets/mancuernas.png'

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  text: string;
  color: string;
}

const FeatureCard = ({ icon: Icon, title, text, color }: FeatureProps) => (
  <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 shadow-sm dark:shadow-none">
    <div className={`p-4 rounded-full mb-6 ${color} bg-opacity-20`}>
      <Icon size={32} className={color.replace('bg-', 'text-')} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-300">{text}</p>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0C10] text-gray-900 dark:text-white transition-colors duration-300">
      {/* 1 navbar */}
      <Navbar />

      {/* 2 hero section */}
      <main className="w-full w-[95%] mx-auto px-8 md:px-16 pt-32 pb-20 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* lado izquierdo textos */}
        <div className="flex-1 text-left flex flex-col items-start">
          
          {/* etiqueta equipamiento 2026 */}
          <div className="inline-flex items-center gap-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 backdrop-blur-md rounded-full px-6 py-2.5 text-base md:text-lg font-medium text-gray-700 dark:text-gray-200 mb-8 shadow-xl transition-colors duration-300">
             <span className="text-blue-400 text-xl">📈</span> Equipamiento 2026
          </div>
          
          {/* titulo */}
          <h1 className="text-7xl md:text-9xl font-black leading-tight mb-6 drop-shadow-2xl">
            Entrena <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b6b] to-[#749bff]">
              Sin Límites
            </span>
          </h1>
          
          {/* parrafo */}
          <p className="text-gray-600 dark:text-gray-300 text-xl md:text-2xl max-w-2xl leading-relaxed mb-10 drop-shadow-md transition-colors duration-300">
            Bienvenido a Cartium Store. El mejor equipamiento profesional para llevar tu rendimiento al siguiente nivel. Descubre nuestra selección premium de productos de gimnasio.
          </p>
          
          {/* boton al catalogo */}
          <Link 
            to="/catalogo" 
            className="mt-6 inline-block bg-[#f04e4e] hover:bg-[#d64545] text-white px-12 py-5 rounded-2xl font-black transition-all shadow-2xl shadow-red-500/30 text-xl hover:scale-105"
          >
            Comprar Ahora
          </Link>
        </div>

        {/* lado derecho imagen */}
        <div className="flex-1 flex justify-center md:justify-center mt-12 md:mt-0">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-br from-[#f04e4e] to-[#4e7ef0] rounded-[32px] blur-3xl opacity-30"></div>
            <img 
              src={principal}
              alt="Foto Principal" 
              className="relative rounded-[24px] w-[450px] h-[600px] object-cover border border-white/20 shadow-2xl"
            />
          </div>
        </div>
      </main>

      {/* 3 seccion beneficios */}
      <section className="w-full px-8 md:px-16 py-32 bg-gray-100 dark:bg-black/10 border-t border-gray-200 dark:border-white/5 backdrop-blur-sm transition-colors duration-300">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black mb-4 drop-shadow-lg">¿Por Qué Elegirnos?</h2>
          <p className="text-gray-600 dark:text-gray-300 italic text-lg transition-colors duration-300">Compromiso con la calidad y tu satisfacción</p>
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

        {/* 4 banner cta */}
        <div className="relative rounded-3xl py-20 px-10 md:px-16 text-center overflow-hidden border border-gray-200 dark:border-white/20 shadow-2xl transition-colors duration-300">
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

    {/* 5 footer */}
      <footer className="w-full border-t border-gray-200 dark:border-white/10 pt-16 pb-8 px-6 mt-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
          
          {/* columna 1 logo nuevo y descripcion */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="flex items-center gap-3 justify-center">
              <img 
                src={logo} 
                alt="Logo Cartium Store" 
                className="w-10 h-10 rounded-xl object-cover" 
              />
              <span className="text-xl font-black tracking-wide">Cartium Store</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-sm transition-colors duration-300">
              Equipamiento profesional para alcanzar tus metas.
            </p>
          </div>

          {/* copyright */}
          <div className="w-full pt-8 border-t border-gray-200 dark:border-white/10 text-center text-gray-400 dark:text-gray-500 text-xs transition-colors duration-300">
            © 2026 Cartium Store. Todos los derechos reservados.
          </div>
          
        </div>
      </footer>
      <Chatbot />
    </div>
  );
}