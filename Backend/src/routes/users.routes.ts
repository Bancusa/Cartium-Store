import { Router } from 'express';
import { registerUser, loginUsuario, actualizarPerfil } from '../controller/users.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUsuario);

// Abrimos el canal para que el frontend mande los datos nuevos
router.put('/update', actualizarPerfil);

export default router;