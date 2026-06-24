import { Request, Response, NextFunction } from 'express';
import conexion from '../DB/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registroUserSchema } from '../schemas/users.schema.js';
import { z } from 'zod';

// 1. Funcion para registrar usuarios de forma segura
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Validamos los datos de entrada con Zod
        const datosValidados = registroUserSchema.safeParse(req.body);
        
        // si la validacion falla devolvemos los errores especificos
        if (!datosValidados.success) {
            res.status(400).json({
                error: datosValidados.error.issues.map((err: z.ZodIssue) => err.message).join(', ')
            });
            return;
        }

        // Si paso la validacion, usamos los datos limpios
        const { nombre, apellido, email, password, dni, direccion } = datosValidados.data;

        // verificamos si el email ya existe en la base de datos
        const [usuarioExistente]: any = await conexion.execute(
            'SELECT id FROM users WHERE email = ?', 
            [email]
        );

        if (usuarioExistente.length > 0) {
            res.status(400).json({ error: 'el email ya se encuentra registrado' });
            return;
        }

        // hasheamos la contrasenia de forma segura
        const salt = await bcrypt.genSalt(10);
        const passwordHasheada = await bcrypt.hash(password, salt);

        // insertamos el nuevo usuario con rol por defecto 'user'
        await conexion.execute(
            'INSERT INTO users (nombre, apellido, email, password, dni, direccion, rol) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nombre, apellido, email, passwordHasheada, dni, direccion, 'user']
        );

        res.status(201).json({ mensaje: 'usuario registrado de forma impecable' });

    } catch (error) {
        next(error); // se lo mandamos al escudo de errores global
    }
};

// 2. Funcion para loguear usuarios y emitir el JWT (La que estaba faltando)
export const loginUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'el email y la contrasenia son mandatorios' });
            return;
        }

        // Buscamos al usuario en la base de datos por su email
        const [usuarios]: any = await conexion.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (usuarios.length === 0) {
            res.status(400).json({ error: 'las credenciales ingresadas no son validas' });
            return;
        }

        const usuario = usuarios[0];

        // Comparamos la contrasenia ingresada con el hash guardado en MySQL
        const contraseniaValida = await bcrypt.compare(password, usuario.password);
        if (!contraseniaValida) {
            res.status(400).json({ error: 'las credenciales ingresadas no son validas' });
            return;
        }

        // Emitimos el token JWT usando la clave secreta del servidor
        const jwtSecret = process.env.JWT_SECRET || 'clave_secreta_temporal_cartium';
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, rol: usuario.rol },
            jwtSecret,
            { expiresIn: '24h' }
        );

        // Devolvemos la info limpia para que el frontend la guarde en el localStorage
        res.json({
            mensaje: 'login exitoso',
            token,
            rol: usuario.rol,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email
            }
        });

    } catch (error) {
        next(error); // ataja el manejador global si explota algo
    }
};