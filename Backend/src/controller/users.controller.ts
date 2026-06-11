import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { conectarDB } from '../DB/database.js'; 

// funcion register

export const registrarUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, apellido, email, password } = req.body;
        
        console.log('Intento de registro recibido:', { nombre, apellido, email });

        if (!email || !password) {
            res.status(400).json({ message: 'El email y la contraseña son obligatorios' });
            return;
        }

        const passwordHasheada = await bcrypt.hash(password, 10);
        const conexion = await conectarDB();

        const nombreFinal = nombre !== undefined && nombre !== '' ? nombre : null;
        const apellidoFinal = apellido !== undefined && apellido !== '' ? apellido : null;
        
        const query = 'INSERT INTO users (nombre, apellido, email, password) VALUES (?, ?, ?, ?)';
        await conexion.execute(query, [nombreFinal, apellidoFinal, email, passwordHasheada]);
        await conexion.end();

        console.log('Usuario insertado con exito en MySQL 🗿');
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

// funcion login

export const loginUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Email y contraseña son obligatorios' });
            return;
        }

        const conexion = await conectarDB();

        const [filas]: any = await conexion.execute('SELECT * FROM users WHERE email = ?', [email]);
        const usuario = filas[0];

        await conexion.end();

        if (!usuario) {
            res.status(401).json({ message: 'Credenciales incorrectas' });
            return;
        }

        const passwordCorrecta = await bcrypt.compare(password, usuario.password);

        if (!passwordCorrecta) {
            res.status(401).json({ message: 'Credenciales incorrectas' });
            return;
        }

        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol }, 
            'mi_palabra_secreta', 
            { expiresIn: '2h' } 
        );

        res.status(200).json({ 
            message: 'Login exitoso',
            token: token,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            dni: usuario.dni,
            direccion: usuario.direccion,   
            rol: usuario.rol
        });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//funcion para actualizar datos desde el perfil
export const actualizarPerfil = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, apellido, dni, direccion, email } = req.body;

        if (!email) {
            res.status(400).json({ message: 'El email es obligatorio para saber a quien actualizar' });
            return;
        }

        const conexion = await conectarDB();

        const query = 'UPDATE users SET nombre = ?, apellido = ?, dni = ?, direccion = ? WHERE email = ?';
        await conexion.execute(query, [nombre, apellido, dni, direccion, email]);

        await conexion.end();

        res.status(200).json({ message: '¡Perfil actualizado en la base de datos!' });

    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};