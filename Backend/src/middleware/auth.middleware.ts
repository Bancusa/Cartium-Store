import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export interface AuthRequest extends Request {
    usuario?: any; 
}

//Verificacion usuario

export const verificarToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        // Buscamos el token en la cabecera de la petición (Headers)
        const token = req.header('Authorization')?.split(' ')[1]; 

        if (!token) {
            res.status(403).json({ message: 'Acceso denegado. No tenés token.' });
            return;
        }

        // Verificamos si el token es real y no fue falsificado ni expiró
        const payload = jwt.verify(token, 'mi_palabra_secreta'); 
        
        // Le pegamos los datos del usuario (id y rol) a la petición para que el próximo lo vea
        req.usuario = payload; 
        
        // ¡Pasá! (Esto le avisa a Express que siga su camino)
        next(); 
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

//Verificacion admin

export const esAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    // Si el usuario no existe o su rol no es admin, lo rebotamos
    if (!req.usuario || req.usuario.rol !== 'admin') {
        res.status(403).json({ message: 'No tiene permiso.' });
        return;
    }
    
    // Si es admin, autorizar con next()
    next();
};