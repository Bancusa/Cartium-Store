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
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-blue-500/30">
      
      {/* 1. NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f04e4e] to-[#4e7ef0]"></div>
          <span className="font-black text-2xl tracking-tighter italic">CARTIUM</span>
        </div>
        <div className="hidden md:flex gap-4">
          <button className="flex items-center gap-2 bg-[#4e7ef0] px-6 py-2 rounded-full font-bold shadow-lg shadow-blue-500/20">
            <Home size={18} /> Inicio
          </button>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-2 rounded-full hover:bg-white/10 transition">
            <LayoutGrid size={18} /> Catálogo
          </button>
        </div>
        <div className="flex gap-6 items-center">
          <button className="text-gray-400 hover:text-white transition flex items-center gap-2 text-sm font-medium">
            <User size={18} /> INICIAR SESIÓN
          </button>
          <button className="bg-[#4e7ef0] px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
            <ShoppingCart size={18} /> Carrito
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <main className="max-w-7xl mx-auto px-10 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1 text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-8">
             📈 Equipamiento 2026
          </div>
          <h1 className="text-7xl font-black leading-[0.9] tracking-tighter mb-6">
            ENTRENA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f04e4e] to-[#4e7ef0]">
              SIN LÍMITES
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md leading-relaxed mb-10">
            Bienvenido a Cartium Store. El mejor equipamiento profesional para llevar tu rendimiento al nivel elite.
          </p>
          <button className="bg-[#f04e4e] hover:bg-[#d64545] text-white px-10 py-4 rounded-xl font-black text-lg transition-all hover:scale-105 uppercase">
            Comprar Ahora
          </button>
        </div>

        {/* Imagen del Hero */}
        <div className="flex-1 flex justify-end">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#f04e4e] to-[#4e7ef0] rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img 
              src="https://images.unsplash.com/photo-1583454110551-21f2fa2adfcd?q=80&w=2070&auto=format&fit=crop" 
              alt="Mancuernas" 
              className="relative rounded-2xl w-[450px] h-[550px] object-cover border border-white/10"
            />
          </div>
        </div>
      </main>

      {/* 3. SECCIÓN ¿POR QUÉ ELEGIRNOS? */}
      <section className="max-w-7xl mx-auto px-10 py-32 border-t border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black mb-4">¿Por Qué Elegirnos?</h2>
          <p className="text-gray-500 italic">Compromiso con la calidad y tu satisfacción</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </section>

    </div>
  );
}