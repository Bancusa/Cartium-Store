import { Request, Response, NextFunction } from 'express';

// este middleware captura cualquier error que ocurra en los endpoints
export const manejadorErroresGlobal = (
    err: any, 
    req: Request, 
    res: Response, 
    next: NextFunction
): void => {
    // registramos el error con todo el detalle en la consola del servidor
    console.error('*** ERROR CAPTURADO POR EL ESCUDO GLOBAL ***');
    console.error(err.stack || err);

    // si el error tiene un status personalizado lo usamos, sino mandamos 500
    const statusCode = err.statusCode || 500;
    const mensaje = err.message || 'error interno del servidor';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        error: mensaje
    });
};