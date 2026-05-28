import { useState } from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Chatbot from '../components/Chatbot';

export default function Auth() {
  const [esLogin, setEsLogin] = useState(true);
  
  // variables para guardar lo que escribe el usuario en tiempo real
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    const endpoint = esLogin ? '/api/usuarios/login' : '/api/usuarios/register';
    
    const datosUsuario = esLogin 
      ? { email, password } 
      : { nombre, email, password };

    try {
      // le pegamos directo a la ruta relativa
      const respuesta = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosUsuario)
      });

      const data = await respuesta.json();
      
      if (respuesta.ok) {
        console.log("Funciono 🗿", data);
        // aca logica de redireccion
      } else {
        console.error("El backend fallo", data);
      }
      
    } catch (error) {
      console.error("fallo la conexion al servidor", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0C10] text-gray-900 dark:text-white font-sans w-full flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 pt-20">
        <div className="w-full max-w-md bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-10 rounded-[32px] shadow-2xl relative overflow-hidden transition-colors duration-300">
          
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#f04e4e]/20 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#4e7ef0]/20 rounded-full blur-[80px]"></div>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black mb-3">
                {esLogin ? '¡Hola de nuevo!' : 'Crear Cuenta'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 transition-colors duration-300">
                {esLogin 
                  ? 'Ingresá tus datos para seguir comprando.' 
                  : 'Sumate a la comunidad de Cartium Store.'}
              </p>
            </div>

            {/* aca conectamos la funcion al formulario entero */}
            <form onSubmit={manejarEnvio} className="flex flex-col gap-5 mb-12">
              {!esLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Nombre completo" 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                />
              </div>

              <div>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500" size={18} />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
                  />
                </div>
    
                {esLogin && (
                  <div className="flex justify-end mt-2 mr-1">
                    <Link to="/recuperar-clave" className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#4e7ef0] transition-colors">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                )}
              </div>

              {/* el boton de tipo submit hace que se dispare el manejarEnvio */}
              <button type="submit" className="w-full bg-[#4e7ef0] hover:bg-blue-600 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 mt-2 hover:scale-[1.02] active:scale-95">
                {esLogin ? 'Iniciar Sesión' : 'Registrarse'} <ArrowRight size={18} />
              </button>
            </form>

            <p className="text-center text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">
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
      <Chatbot />
    </div>
  );
}