import { Request, Response } from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';

export const crearPreferencia = async (req: Request, res: Response): Promise<void> => {
    try {
        const { items } = req.body;

        if (!items || items.length === 0) {
            res.status(400).json({ message: 'El carrito está vacío' });
            return;
        }

        // Inicializar Mercado Pago
        const client = new MercadoPagoConfig({ 
            accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN as string 
        });

        //Crear la preferencia
        const preference = new Preference(client);

        const result = await preference.create({
            body: {
                items: items,
                // Le pasamos URLs con HTTPS real para pasar la validación estricta
                back_urls: {
                    success: 'https://www.mercadopago.com.ar',
                    failure: 'https://www.mercadopago.com.ar',
                    pending: 'https://www.mercadopago.com.ar'
                },
                auto_return: 'approved',
            }
        });

        // Le devolvemos el ID de esta orden al frontend
        res.status(200).json({ 
            id: result.id,
            init_point: result.init_point 
        });

    } catch (error) {
        console.error('Error al crear preferencia en MP:', error);
        res.status(500).json({ message: 'Error interno al procesar el pago' });
    }
};