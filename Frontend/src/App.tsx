import { type LucideIcon, ShieldCheck, Zap, Leaf, ShoppingCart, User, Home, LayoutGrid } from 'lucide-react';

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
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-blue-500/30 font-sans">
      
      {/* 1. NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f04e4e] to-[#4e7ef0]"></div>
          <span className="font-bold text-xl">Cartium Store</span>
        </div>
        <div className="hidden md:flex gap-4">
          <button className="flex items-center gap-2 bg-[#4e7ef0] px-6 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-blue-500/20">
            <Home size={16} /> Inicio
          </button>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full hover:bg-white/10 transition text-sm font-medium">
            <LayoutGrid size={16} /> Catálogo
          </button>
        </div>
        <div className="flex gap-6 items-center">
          <button className="text-gray-400 hover:text-white transition flex items-center gap-2 text-sm font-medium">
            <User size={16} /> Iniciar Sesión
          </button>
          <button className="bg-[#4e7ef0] px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg shadow-blue-500/20">
            <ShoppingCart size={16} /> Carrito
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <main className="max-w-7xl mx-auto px-10 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-left">
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 text-xs text-gray-300 mb-6">
             <span className="text-blue-400">📈</span> Equipamiento 2026
          </div>
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-4">
            Entrena <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f04e4e] to-[#4e7ef0]">
              Sin Límites
            </span>
          </h1>
          <p className="text-gray-400 text-base max-w-md leading-relaxed mb-8">
            Bienvenido a Cartium Store. El mejor equipamiento profesional para llevar tu rendimiento al siguiente nivel. Descubre nuestra selección premium de productos de gimnasio.
          </p>
          <button className="bg-[#f04e4e] hover:bg-[#d64545] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-500/20">
            Comprar Ahora
          </button>
        </div>

        {/* Imagen del Hero */}
        <div className="flex-1 flex justify-end">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#f04e4e] to-[#4e7ef0] rounded-[32px] blur-2xl opacity-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1583454110551-21f2fa2adfcd?q=80&w=800&auto=format&fit=crop" 
              alt="Mancuernas Cartium" 
              className="relative rounded-[24px] w-[380px] h-[520px] object-cover border border-white/10 shadow-2xl"
            />
          </div>
        </div>
      </main>

      {/* 3. SECCIÓN BENEFICIOS */}
      <section className="max-w-7xl mx-auto px-10 py-32 border-t border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black mb-4">¿Por Qué Elegirnos?</h2>
          <p className="text-gray-500 italic text-lg">Compromiso con la calidad y tu satisfacción</p>
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
        <div className="relative rounded-3xl p-16 text-center overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-[#0B0C10] to-blue-900/40 opacity-80"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-6">¿Listo para transformar tu entrenamiento?</h2>
            <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
              Únete a miles de atletas que confían en Cartium Store para su equipamiento de calidad profesional.
            </p>
            <button className="bg-[#4e7ef0] hover:bg-blue-600 px-12 py-4 rounded-xl font-black text-lg transition-all shadow-xl shadow-blue-500/20">
              Explorar Catálogo
            </button>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-[#0B0C10] pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-left">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f04e4e] to-[#4e7ef0]"></div>
                <span className="font-bold text-xl">Cartium Store</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Equipamiento profesional para alcanzar tus metas.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-sm tracking-widest">Productos</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li className="hover:text-white cursor-pointer transition">Pesas</li>
                <li className="hover:text-white cursor-pointer transition">Barras</li>
                <li className="hover:text-white cursor-pointer transition">Mancuernas</li>
                <li className="hover:text-white cursor-pointer transition">Accesorios</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-sm tracking-widest">Compañía</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li className="hover:text-white cursor-pointer transition">Sobre Nosotros</li>
                <li className="hover:text-white cursor-pointer transition">Contacto</li>
                <li className="hover:text-white cursor-pointer transition">Soporte</li>
                <li className="hover:text-white cursor-pointer transition">FAQ</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-sm tracking-widest">Legal</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li className="hover:text-white cursor-pointer transition">Privacidad</li>
                <li className="hover:text-white cursor-pointer transition">Términos</li>
                <li className="hover:text-white cursor-pointer transition">Envíos</li>
                <li className="hover:text-white cursor-pointer transition">Devoluciones</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
            © 2026 Cartium Store. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}