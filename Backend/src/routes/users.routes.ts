import { Router } from 'express';
import { registrarUsuario, loginUsuario} from '../controller/users.controller.js';

const router = Router();

// Endpoint para registrar a cualquier persona (cliente o admin)
router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);
export default router;
