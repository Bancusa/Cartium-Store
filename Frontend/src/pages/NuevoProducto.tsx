import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const NuevoProducto = () => {
  const navigate = useNavigate()
  
  // estado para guardar lo que escribimos en el formulario
  const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    categoria: 'Bancos'
  })

  // funcion para mandar los datos al backend
  const crearProducto = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    
    console.log("Token detectado:", token);

    if (!token) {
        alert("No hay token. Iniciá sesión de nuevo, por favor.");
        return;
    }

    try {
        const respuesta = await fetch('http://localhost:4000/api/productos/create', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(formulario)
        });

      if (respuesta.ok) {
        alert('Producto creado y subido a la tienda')
        navigate('/catalogo') 
      } else {
        alert('Hubo un error al crear el producto')
      }
    } catch (error) {
        console.error('error al crear', error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f11] text-gray-900 dark:text-white p-8 transition-colors duration-300 flex justify-center items-start pt-20">
        
        <div className="bg-white dark:bg-[#1a1a1c] p-10 rounded-3xl w-full max-w-2xl shadow-xl border border-gray-200 dark:border-white/10">
          <div className="mb-8">
            <span className="text-sm font-bold text-[#5c8aff] tracking-wider uppercase">Panel de control</span>
            <h1 className="text-3xl font-black mt-1">Añadir Nuevo Producto</h1>
          </div>

          <form onSubmit={crearProducto} className="flex flex-col gap-6">
            
            <div>
              <label className="text-xs font-bold uppercase tracking-wider opacity-50 mb-2 block">Nombre del equipo</label>
              <input 
                type="text" 
                required
                value={formulario.nombre}
                onChange={(e) => setFormulario({...formulario, nombre: e.target.value})}
                className="w-full bg-gray-50 dark:bg-[#0f0f11] text-gray-900 dark:text-white px-5 py-4 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-[#5c8aff] transition-all"
                placeholder="Ej Banco plano profesional"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider opacity-50 mb-2 block">Descripcion</label>
              <textarea 
                required
                value={formulario.descripcion}
                onChange={(e) => setFormulario({...formulario, descripcion: e.target.value})}
                className="w-full bg-gray-50 dark:bg-[#0f0f11] text-gray-900 dark:text-white px-5 py-4 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-[#5c8aff] transition-all resize-none h-32"
                placeholder="Detalles tecnicos del producto"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="text-xs font-bold uppercase tracking-wider opacity-50 mb-2 block">Precio ($)</label>
                <input 
                  type="number" 
                  required
                  value={formulario.precio}
                  onChange={(e) => setFormulario({...formulario, precio: Number(e.target.value)})}
                  className="w-full bg-gray-50 dark:bg-[#0f0f11] text-gray-900 dark:text-white px-5 py-4 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-[#5c8aff] transition-all"
                />
              </div>

              <div className="flex-1">
                <label className="text-xs font-bold uppercase tracking-wider opacity-50 mb-2 block">Stock inicial</label>
                <input 
                  type="number" 
                  required
                  value={formulario.stock}
                  onChange={(e) => setFormulario({...formulario, stock: Number(e.target.value)})}
                  className="w-full bg-gray-50 dark:bg-[#0f0f11] text-gray-900 dark:text-white px-5 py-4 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-[#5c8aff] transition-all"
                />
              </div>

              <div className="flex-1">
                <label className="text-xs font-bold uppercase tracking-wider opacity-50 mb-2 block">Categoria</label>
                <select
                  value={formulario.categoria}
                  onChange={(e) => setFormulario({...formulario, categoria: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-[#0f0f11] text-gray-900 dark:text-white px-5 py-4 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-[#5c8aff] transition-all cursor-pointer"
                >
                  <option value="Bancos">Bancos</option>
                  <option value="Mancuernas">Mancuernas</option>
                  <option value="Barras">Barras</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Discos">Discos</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-4 pt-6 border-t border-gray-200 dark:border-white/10">
              <button 
                type="button"
                onClick={() => navigate('/catalogo')}
                className="flex-1 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 font-bold py-4 rounded-xl transition-colors cursor-pointer"
              >
                Cancelar y Volver
              </button>
              <button 
                type="submit" 
                className="flex-1 bg-[#5c8aff] hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 cursor-pointer"
              >
                Publicar Producto
              </button>
            </div>

          </form>
        </div>

      </div>
    </>
  )
}

export default NuevoProducto