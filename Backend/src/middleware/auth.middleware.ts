import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export interface AuthRequest extends Request {
    usuario?: any; 
}

//Verificacion usuario
export const verificarToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        
        if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Acceso denegado, no hay token' });
            return;
        }

        const token = authHeader.split(' ')[1];
        const decodificado = jwt.verify(token, 'mi_palabra_secreta');
        
        req.usuario = decodificado;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

//Verificacion admin
export const esAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.usuario || req.usuario.rol !== 'admin') {
        res.status(403).json({ message: 'No tiene permiso.' });
        return;
    }
    
    next();
};