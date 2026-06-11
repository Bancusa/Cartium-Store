import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Catalogo from './pages/catalogo'
import Carrito from './pages/carrito'
import Auth from './pages/Auth'
import Perfil from './pages/perfil'
import NuevoProducto from './pages/NuevoProducto'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/nuevo-producto" element={<NuevoProducto />} />
      </Routes>
    </BrowserRouter>
  )
}