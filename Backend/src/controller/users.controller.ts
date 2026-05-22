import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { conectarDB } from '../DB/database.js'; 


//FUNCION REGISTER

export const registrarUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'El email y la contraseña son obligatorios' });
            return;
        }

        const passwordHasheada = await bcrypt.hash(password, 10);

        // 2. Llamamos a tu base de datos para abrir la conexión
        const conexion = await conectarDB();

        // 3. Guardamos el usuario usando "conexion.execute"
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        await conexion.execute(query, [email, passwordHasheada]);

        // 4. Cerramos la conexión para que no quede consumiendo memoria
        await conexion.end();

        res.status(201).json({ message: '¡Usuario registrado con éxito!' });

    } catch (error: any) {
        console.error('Error al registrar usuario:', error);
        
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ message: 'Este email ya está en uso, probá con otro' });
        } else {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};

//FUNCION LOGIN

export const loginUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Email y contraseña son obligatorios' });
            return;
        }

        const conexion = await conectarDB();

        // 1. Buscamos si existe alguien con ese email en la tabla "users"
        const [filas]: any = await conexion.execute('SELECT * FROM users WHERE email = ?', [email]);
        const usuario = filas[0];

        await conexion.end();

        // Si no encontró a nadie, le decimos que los datos están mal
        if (!usuario) {
            res.status(401).json({ message: 'Credenciales incorrectas' });
            return;
        }

        // 2. Comparamos la contraseña que escribió con la encriptada de la DB
        const passwordCorrecta = await bcrypt.compare(password, usuario.password);

        if (!passwordCorrecta) {
            res.status(401).json({ message: 'Credenciales incorrectas' });
            return;
        }

        // 3. ¡Todo está bien! Le fabricamos el Token 
        // Guardamos su ID y su ROL adentro del token.
        // NOTA: "mi_palabra_secreta" debería ir en tu archivo .env por seguridad, pero lo dejamos así para probar.
        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol }, 
            'mi_palabra_secreta', 
            { expiresIn: '2h' } // El token se autodestruye en 2 horas
        );

        // 4. Se lo mandamos al frontend
        res.status(200).json({ 
            message: '¡Login exitoso!',
            token: token 
        });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};