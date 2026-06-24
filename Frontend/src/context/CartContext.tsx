import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// definimos la estructura que tiene que tener cada producto en el carrito
interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: number;
  [key: string]: unknown;
}

// definimos que funciones y datos va a exportar el contexto
interface CartContextType {
  carrito: ProductoCarrito[];
  agregarAlCarrito: (producto: ProductoCarrito) => void;
  eliminarDelCarrito: (index: number) => void;
  cantidadTotal: number;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // cargamos el carrito inicial intentando leer desde el localStorage
  const [carrito, setCarrito] = useState<ProductoCarrito[]>(() => {
    const carritoGuardado = localStorage.getItem('cartium_cart');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // cada vez que el carrito cambie se guarda la copia actualizada en el navegador
  useEffect(() => {
    localStorage.setItem('cartium_cart', JSON.stringify(carrito));
  }, [carrito]);

  // funcion para meter un producto al carrito
  const agregarAlCarrito = (producto: ProductoCarrito) => {
    setCarrito([...carrito, producto]);
  };

  // funcion para sacar un producto usando su posicion en el arreglo
  const eliminarDelCarrito = (indexEliminar: number) => {
    setCarrito(carrito.filter((_, index) => index !== indexEliminar));
  };

  const cantidadTotal = carrito.length;

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, cantidadTotal }}>
      {children}
    </CartContext.Provider>
  );
};