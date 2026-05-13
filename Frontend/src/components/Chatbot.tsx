import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Mensaje {
  rol: 'usuario' | 'bot';
  texto: string;
}

export default function Chatbot() {
  const [abierto, setAbierto] = useState(false);
  const [inputMensaje, setInputMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  
  // Historial de la charla 
  const [chatLog, setChatLog] = useState<Mensaje[]>([
    { rol: 'bot', texto: '¡Hola! Soy el asistente virtual de Cartium Store. ¿En qué te puedo ayudar?' }
  ]);
  
  const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook-test/260b69f3-4452-4f8f-a395-1520f92ec5d7';
  
  const enviarMensaje = async () => {
    if (!inputMensaje.trim()) return;
    
    const msjUsuario: Mensaje = { rol: 'usuario', texto: inputMensaje };
    const nuevosMensajes = [...chatLog, msjUsuario];
    
    setChatLog(nuevosMensajes);
    setInputMensaje('');
    setCargando(true);
    /*  */
    
    try {
      const respuesta = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mensaje: inputMensaje }) 
      });

      if (!respuesta.ok) throw new Error('Error en n8n');
      
      const data = await respuesta.json();
      const msjBot: Mensaje = { rol: 'bot', texto: data.respuesta || 'Mensaje recibido pero sin respuesta configurada' };
      setChatLog([...nuevosMensajes, msjBot]);
    } catch (error) {
      console.error("Fallo la conexion con n8n:", error);
      const msjError: Mensaje = { rol: 'bot', texto: 'Ha ocurrido un error. Intenta de nuevo en un rato' };
      setChatLog([...nuevosMensajes, msjError]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      {/* Ventana del Chatbot */}
      <div
        className={`mb-4 w-80 sm:w-96 bg-[#12141A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right ${
          abierto ? 'scale-100 opacity-100' : 'scale-0 opacity-0 hidden'
        }`}
      >
        {/* Header */}
        <div className="bg-[#4e7ef0] p-4 flex justify-between items-center text-white shadow-md z-10">
          <div className="flex items-center gap-2">
            <MessageCircle size={20} />
            <span className="font-bold tracking-wide">Soporte Cartium</span>
          </div>
          <button onClick={() => setAbierto(false)} className="hover:bg-white/20 p-1 rounded-md transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Historial de Mensajes */}
        <div className="p-4 h-80 overflow-y-auto flex flex-col gap-4 text-sm bg-black/40">
          {chatLog.map((msg, index) => (
            <div key={index} className={`flex ${msg.rol === 'usuario' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`p-3 rounded-2xl max-w-[85%] leading-relaxed shadow-sm ${
                  msg.rol === 'usuario' 
                    ? 'bg-[#4e7ef0] text-white rounded-tr-sm' // Estilo mensaje tuyo
                    : 'bg-white/10 text-white rounded-tl-sm' // Estilo mensaje bot
                }`}
              >
                {msg.texto}
              </div>
            </div>
          ))}

          {/* Indicador de "Escribiendo..." */}
          {cargando && (
            <div className="flex justify-start">
              <div className="bg-white/10 text-gray-400 p-3 rounded-2xl rounded-tl-sm text-xs animate-pulse">
                Procesando...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-white/10 flex items-center gap-2 bg-[#12141A]">
          <input 
            type="text" 
            placeholder="Escribí tu mensaje..." 
            value={inputMensaje}
            onChange={(e) => setInputMensaje(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
            className="flex-1 bg-black/20 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-[#4e7ef0] transition-all"
          />
          <button 
            onClick={enviarMensaje}
            disabled={cargando || !inputMensaje.trim()}
            className="text-white bg-[#4e7ef0] hover:bg-blue-600 disabled:bg-gray-600 disabled:opacity-50 transition-all p-2.5 rounded-xl shadow-lg hover:scale-105 active:scale-95"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Boton flotante */}
      <button 
        onClick={() => setAbierto(!abierto)}
        className="bg-[#4e7ef0] hover:bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center relative"
      >
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