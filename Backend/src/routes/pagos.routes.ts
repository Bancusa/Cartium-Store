import { Router } from 'express';
import { crearPreferencia } from '../controller/pagos.controller.js';

const router = Router();

// ruta post vinculada al controlador de mercado pago
router.post('/create_preference', crearPreferencia);

export default router;