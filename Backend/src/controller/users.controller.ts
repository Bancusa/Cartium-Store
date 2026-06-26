import { Request, Response, NextFunction } from 'express'
import conexion from '../DB/database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { registroUserSchema } from '../schemas/users.schema.js'
import { z } from 'zod'
import nodemailer from 'nodemailer' 
//'nodemailer': Requiere instalacion por consola npm install nodemailer y npm install -D @types/nodemailer
//'zod': requiere instalacion por consola npm install zod

// funcion para registrar usuarios de forma segura
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // validamos los datos de entrada con zod
        const datosValidados = registroUserSchema.safeParse(req.body)
        
        // si la validacion falla devolvemos los errores especificos
        if (!datosValidados.success) {
            res.status(400).json({
                error: datosValidados.error.issues.map((err: z.ZodIssue) => err.message).join(' ')
            })
            return
        }

        // si paso la validacion usamos los datos limpios
        const { nombre, apellido, email, password, dni, direccion } = datosValidados.data

        // verificamos si el email ya existe en la base de datos
        const [usuarioExistente]: any = await conexion.execute(
            'SELECT id FROM users WHERE email = ?', 
            [email]
        )

        if (usuarioExistente.length > 0) {
            res.status(400).json({ error: 'el email ya se encuentra registrado' })
            return
        }

        // hasheamos la contrasenia de forma segura
        const salt = await bcrypt.genSalt(10)
        const passwordHasheada = await bcrypt.hash(password, salt)

        // insertamos el nuevo usuario con rol por defecto user
        await conexion.execute(
            'INSERT INTO users (nombre, apellido, email, password, dni, direccion, rol) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nombre, apellido, email, passwordHasheada, dni, direccion, 'user']
        )

        // inicio bloque envio de mail
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            })

            await transporter.sendMail({
                from: `"Cartium Store" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: `Bienvenido a Cartium ${nombre}`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h1 style="color: #4e7ef0;">Hola ${nombre}</h1>
                        <p>Tu cuenta en <strong>Cartium Store</strong> fue creada con exito</p>
                        <p>Ya podes iniciar sesion con tus credenciales y acceder a nuestro catalogo para realizar tus compras</p>
                        <p>Te pedimos que verifiques tu datos cliqueando en la parte de tu nombre para acceder a tu perfil</p>
                        <hr style="border: 1px solid #eee; margin: 20px 0;" />
                        <p style="font-size: 12px; color: #888;">Este es un mensaje automatico por favor no respondas a esta direccion</p>
                    </div>
                `
            })
            console.log(`mail de bienvenida enviado a ${email}`)
        } catch (mailError) {
            console.error('fallo al intentar enviar el mail de bienvenida', mailError)
        }

        res.status(201).json({ mensaje: 'usuario registrado de forma impecable' })

    } catch (error) {
        next(error)
    }
}

// funcion para loguear usuarios
export const loginUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({ error: 'el email y la contrasenia son mandatorios' })
            return
        }

        // buscamos al usuario en la base de datos por su email
        const [usuarios]: any = await conexion.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )

        if (usuarios.length === 0) {
            res.status(400).json({ error: 'las credenciales ingresadas no son validas' })
            return
        }

        const usuario = usuarios[0]

        // comparamos la contrasenia ingresada con el hash guardado en mysql
        const contraseniaValida = await bcrypt.compare(password, usuario.password)
        if (!contraseniaValida) {
            res.status(400).json({ error: 'las credenciales ingresadas no son validas' })
            return
        }

        // emitimos el token jwt usando la clave secreta del servidor
        const jwtSecret = process.env.JWT_SECRET || 'clave_secreta_temporal_cartium'
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, rol: usuario.rol },
            jwtSecret,
            { expiresIn: '24h' }
        )

        // devolvemos la info limpia para que el frontend la guarde en el localstorage
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
        })

    } catch (error) {
        next(error)
    }
}

export const actualizarPerfil = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { nombre, apellido, direccion, dni, email } = req.body;

        if (!email) {
            res.status(400).json({ error: 'El email es obligatorio para localizar tu cuenta' });
            return;
        }

        const [resultado]: any = await conexion.execute(
            'UPDATE users SET nombre = ?, apellido = ?, direccion = ?, dni = ? WHERE email = ?',
            [nombre, apellido, direccion, dni, email]
        );

        if (resultado.affectedRows === 0) {
            res.status(404).json({ error: 'El usuario no figura en la base de datos' });
            return;
        }

        res.json({ mensaje: 'Perfil actualizado de forma impecable' });

    } catch (error) {
        next(error);
    }
};