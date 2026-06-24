import { Router } from 'express';
// Asegurate que coincida con el nombre exacto del controlador exportado
import { registerUser, loginUsuario } from '../controller/users.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUsuario);

export default router;