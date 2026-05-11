import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function Chatbot() {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Ventana del Chatbot */}
      <div 
        className={`mb-4 w-80 sm:w-96 bg-[#12141A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right ${
          abierto ? 'scale-100 opacity-100' : 'scale-0 opacity-0 hidden'
        }`}
      >
        {/* Header del chat */}
        <div className="bg-[#4e7ef0] p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <MessageCircle size={20} />
            <span className="font-bold tracking-wide">Soporte Cartium</span>
          </div>
          <button 
            onClick={() => setAbierto(false)} 
            className="hover:bg-white/20 p-1 rounded-md transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cuerpo del chat (Mensajes) */}
        <div className="p-4 h-72 overflow-y-auto flex flex-col gap-3 text-sm">
          {/* Mensaje de bienvenida del bot */}
          <div className="bg-white/10 text-white p-3 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl w-[85%] leading-relaxed shadow-sm">
            Hola! Soy el Asistente Virtual de Cartium Store. ¿En qué te puedo ayudar?
          </div>
        </div>

        {/* Input para escribir */}
        <div className="p-3 border-t border-white/10 flex items-center gap-2 bg-black/20">
          <input 
            type="text" 
            placeholder="Escribí tu mensaje..." 
            className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
          />
          <button className="text-white bg-[#4e7ef0] hover:bg-blue-600 transition-all p-2 rounded-xl shadow-lg hover:scale-105 active:scale-95">
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Boton flotante principal */}
      <button 
        onClick={() => setAbierto(!abierto)}
        className="bg-[#4e7ef0] hover:bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center relative"
      >
        {/* Transición del icono: cambia de globo de dialogo a la X si esta abierto */}
        <div className={`transition-transform duration-300 absolute ${abierto ? 'scale-0 rotate-90' : 'scale-100 rotate-0'}`}>
          <MessageCircle size={28} />
        </div>
        <div className={`transition-transform duration-300 ${abierto ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'}`}>
          <X size={28} />
        </div>
      </button>

    </div>
  );
}