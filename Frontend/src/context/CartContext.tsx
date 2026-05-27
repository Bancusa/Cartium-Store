import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: number;
  [key: string]: unknown;
}

interface CartContextType {
  carrito: ProductoCarrito[];
  agregarAlCarrito: (producto: ProductoCarrito) => void;
  eliminarDelCarrito: (index: number) => void; // agregamos eliminar del carrito a la interfaz
  cantidadTotal: number;
}
// ignoramos la advertencia de eslint para el contexto
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);

  const agregarAlCarrito = (producto: ProductoCarrito) => {
    setCarrito([...carrito, producto]);
  };

  // funcion para sacar un producto usando su posicion en el arreglo
  const eliminarDelCarrito = (indexEliminar: number) => {
    setCarrito(carrito.filter((_, index) => index !== indexEliminar));
  };

  const cantidadTotal = carrito.length;

  return (
    // pasamos la funcion en el value
    <CartContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, cantidadTotal }}>
      {children}
    </CartContext.Provider>
  );
};