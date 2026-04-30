import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Catalogo from './pages/catalogo';
import Carrito from './pages/carrito';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </BrowserRouter>
  );
}