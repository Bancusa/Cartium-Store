import { Router } from 'express';
import { crearPreferencia } from '../controller/pagos.controller.js';
import { verificarToken } from '../middleware/auth.middleware.js';

const router = Router();

// Podés elegir protegerla con verificarToken si querés que solo usuarios logueados compren
router.post('/create_preference', crearPreferencia);

export default router;