import { Request, Response } from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';

export const crearPreferencia = async (req: Request, res: Response): Promise<void> => {
    try {
        const { items } = req.body;

        if (!items || items.length === 0) {
            res.status(400).json({ message: 'El carrito esta vacio' });
            return;
        }

        const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
        if (!token) {
            res.status(500).json({ message: 'El token de mercado pago no esta configurado' });
            return;
        }

        const client = new MercadoPagoConfig({ accessToken: token });
        const preference = new Preference(client);

        const itemsProcesados = items.map((item: any) => ({
            title: String(item.title),
            unit_price: Number(item.unit_price),
            quantity: Number(item.quantity || 1),
            currency_id: 'ARS'
        }));

        // quitamos auto_return por completo para evitar que la api de mercado pago rebote el localhost
        const result = await preference.create({
            body: {
                items: itemsProcesados,
                back_urls: {
                    success: 'http://localhost:5173/pago-exitoso',
                    failure: 'http://localhost:5173/pago-fallido',
                    pending: 'http://localhost:5173/pago-pendiente'
                }
            }
        });

        res.status(200).json({ 
            id: result.id,
            init_point: result.init_point 
        });

    } catch (error) {
        console.error('Error al crear preferencia en MP:', error);
        res.status(500).json({ message: 'Error interno al procesar el pago' });
    }
};