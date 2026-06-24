import { Request, Response, NextFunction } from 'express';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import conexion from '../DB/database.js';

export const crearPreferencia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      res.status(400).json({ error: 'el carrito esta vacio' });
      return;
    }

    const itemsPreferencia = items.map((prod: any) => {
      const precioOriginal = prod.precio !== undefined ? prod.precio : prod.unit_price;
      const textoLimpio = String(precioOriginal || '0').replace(/[^0-9.-]+/g, '');
      let precioNumerico = parseFloat(textoLimpio);

      if (isNaN(precioNumerico) || precioNumerico <= 0) {
        console.log(`⚠️ Alerta: El producto ${prod.nombre} vino con precio invalido. Se asigno 100 por defecto.`);
        precioNumerico = 100;
      }

      return {
        id: String(prod.id),
        title: String(prod.nombre || 'Producto sin nombre'),
        unit_price: precioNumerico,
        quantity: Number(prod.cantidad) || 1,
        currency_id: 'ARS'
      };
    });

    const clienteMP = new MercadoPagoConfig({ 
        accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '' 
    });
    
    const preference = new Preference(clienteMP);
    
    // Armamos el objeto de la peticion con un caspeo a 'any' para evitar que TypeScript se queje por las propiedades de las URLs
    const cuerpoPeticion: any = {
      items: itemsPreferencia,
      backUrls: {
        success: 'http://localhost:5173/perfil',
        failure: 'http://localhost:5173/carrito',
        pending: 'http://localhost:5173/carrito'
      },
      autoReturn: 'approved',
      metadata: {
        items_comprados: items.map((p: any) => ({ id: p.id, cantidad: p.cantidad || 1 }))
      }
    };

    const respuesta = await preference.create({ body: cuerpoPeticion });

    console.log("Preferencia generada de forma exitosa:", respuesta.id);
    
    // Mandamos una sola respuesta limpia mapeando el init_point para tu carrito.tsx
    res.json({ 
      id: respuesta.id,
      init_point: respuesta.init_point 
    });

  } catch (error) {
    console.error('error al crear la preferencia de mercado pago', error);
    next(error);
  }
};

export const recibirWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { query } = req;
    const tipoEvento = query.type || query['data.type'];
    
    if (tipoEvento === 'payment') {
      const paymentId = query.id || query['data.id'];
      console.log(`notificacion de pago recibida ID ${paymentId}`);

      const clienteMP = new MercadoPagoConfig({ 
          accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '' 
      });

      const pago = await new Payment(clienteMP).get({ id: Number(paymentId) });
      
      if (pago.status === 'approved') {
        console.log(`pago ${paymentId} aprobado de forma impecable`);
        
        const productos = pago.metadata?.items_comprados;
        
        if (productos && Array.isArray(productos)) {
          for (const prod of productos) {
            await conexion.execute(
              'UPDATE productos SET stock = GREATEST(stock - ?, 0) WHERE id = ?',
              [prod.cantidad, prod.id]
            );
          }
          console.log('stock actualizado en la base de datos de forma automatica');
        }
      }
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('error procesando el webhook de mercado pago', error);
    next(error);
  }
};