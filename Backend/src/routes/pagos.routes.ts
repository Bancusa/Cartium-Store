import { Router } from 'express';
import { crearPreferencia, recibirWebhook } from '../controller/pagos.controller.js';

const router = Router();

router.post('/crear-preferencia', crearPreferencia);

// ESTA ES LA NUEVA RUTA PARA MERCADO PAGO
router.post('/webhook', recibirWebhook);

export default router;