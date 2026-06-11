import express from 'express';
import productController from "../controller/producto.controller.js"
import { verificarToken, esAdmin } from '../middleware/auth.middleware.js';

const router = express.Router()


// Rutas públicas 
router.route("/getAll").get(productController.getAll);
router.route("/:id").get(productController.getById);


//Rutas del admin
router.route("/create").post(verificarToken, esAdmin, productController.create);
router.delete('/eliminar/:id',verificarToken, esAdmin, productController.delete)
router.put('/editar/:id',verificarToken, esAdmin, productController.update)
export default router