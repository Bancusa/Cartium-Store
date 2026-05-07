import { useState } from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function Auth() {
  const [esLogin, setEsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white font-sans w-full flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 pt-20">
        {/* Tarjeta de Auth con Glassmorphism */}
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[32px] shadow-2xl relative overflow-hidden">
          
          {/* Luces de fondo sutiles */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#f04e4e]/20 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#4e7ef0]/20 rounded-full blur-[80px]"></div>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black mb-3">
                {esLogin ? '¡Hola de nuevo!' : 'Crear Cuenta'}
              </h2>
              <p className="text-gray-400">
                {esLogin 
                  ? 'Ingresá tus datos para seguir comprando.' 
                  : 'Sumate a la comunidad de Cartium Store.'}
              </p>
            </div>

            {/* ACÁ ESTÁ LA MAGIA: Le clavé un mb-12 (margin-bottom enorme) al form para que empuje lo de abajo */}
            <form className="flex flex-col gap-5 mb-12">
              {!esLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Nombre completo" 
                    className="w-full bg-black/20 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-500" size={18} />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full bg-black/20 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
                <input 
                  type="password" 
                  placeholder="Contraseña" 
                  className="w-full bg-black/20 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                />
              </div>

              <button className="w-full bg-[#4e7ef0] hover:bg-blue-600 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 mt-2 hover:scale-[1.02] active:scale-95">
                {esLogin ? 'Iniciar Sesión' : 'Registrarse'} <ArrowRight size={18} />
              </button>
            </form>

            {/* Texto para alternar */}
            <p className="text-center text-gray-400 text-sm">
              {esLogin ? '¿No tenés cuenta?' : '¿Ya tenés cuenta?'} {' '}
              <button 
                type="button"
                onClick={() => setEsLogin(!esLogin)}
                className="text-[#4e7ef0] font-bold hover:underline"
              >
                {esLogin ? 'Registrate acá' : 'Iniciá sesión'}
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}