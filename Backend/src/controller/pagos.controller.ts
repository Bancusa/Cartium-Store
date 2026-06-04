import { Request, Response } from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import bcrypt from 'bcrypt';
import { conectarDB } from '../DB/database.js';

export const crearPreferencia = async (req: Request, res: Response): Promise<void> => {
    try {
        const { items, comprador } = req.body;

        // validacion de seguridad para evitar que rompa el backend
        if (!comprador || !comprador.nombre) {
            res.status(400).json({ message: 'Faltan los datos del comprador en la peticion' });
            return;
        }

        if (!items || items.length === 0) {
            res.status(400).json({ message: 'El carrito esta vacio' });
            return;
        }

        const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
        if (!token) {
            res.status(500).json({ message: 'El token de mercado pago no esta configurado' });
            return;
        }

        // 1. conectar a la base de datos mysql
        const conexion = await conectarDB();

        // comprobar si el email ingresado ya existe en la tabla
        const [usuariosEncontrados]: any = await conexion.execute(
            'SELECT id FROM users WHERE email = ?', 
            [comprador.email]
        );

        if (usuariosEncontrados.length > 0) {
            // si el usuario ya existe, actualizamos sus datos de contacto y envio sin tocar su password actual
            const updateQuery = 'UPDATE users SET nombre = ?, apellido = ?, dni = ?, direccion = ? WHERE email = ?';
            await conexion.execute(updateQuery, [
                comprador.nombre,
                comprador.apellido,
                comprador.dni,
                comprador.direccion,
                comprador.email
            ]);
            console.log('✏️ Datos del usuario existente actualizados en MySQL');
        } else {
            // si es un cliente nuevo, validamos que haya mandado la clave
            if (!comprador.password) {
                res.status(400).json({ message: 'La contrasena es obligatoria para registrar al usuario' });
                await conexion.end();
                return;
            }

            // hasheamos la contraseña real que eligio el cliente en el carrito
            const passwordHasheada = await bcrypt.hash(comprador.password, 10);

            // lo registramos en la base con la contraseña protegida y rol user
            const insertQuery = 'INSERT INTO users (nombre, apellido, email, password, dni, direccion, rol) VALUES (?, ?, ?, ?, ?, ?, ?)';
            await conexion.execute(insertQuery, [
                comprador.nombre,
                comprador.apellido,
                comprador.email,
                passwordHasheada,
                comprador.dni,
                comprador.direccion,
                'user'
            ]);
            console.log('🗿 Nuevo usuario registrado en MySQL con la contrasena elegida');
        }
        
        // cerramos la conexion de mysql para no dejar hilos abiertos
        await conexion.end();

        // 2. levantar el cliente de mercado pago para generar la orden
        const client = new MercadoPagoConfig({ accessToken: token });
        const preference = new Preference(client);

        const itemsProcesados = items.map((item: any) => ({
            title: String(item.title),
            unit_price: Number(item.unit_price),
            quantity: Number(item.quantity || 1),
            currency_id: 'ARS'
        }));

        const result = await preference.create({
            body: {
                items: itemsProcesados,
                payer: {
                    name: String(comprador.nombre),
                    surname: String(comprador.apellido),
                    email: String(comprador.email),
                    identification: {
                        type: 'DNI',
                        number: String(comprador.dni)
                    },
                    address: {
                        street_name: String(comprador.direccion)
                    }
                },
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
        console.error('Error al crear preferencia en MP o guardar en BD:', error);
        res.status(500).json({ message: 'Error interno al procesar el pago' });
    }
};