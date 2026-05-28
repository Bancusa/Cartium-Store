import express from 'express';
import productController from "../controller/producto.controller.js"
import { verificarToken, esAdmin } from '../middleware/auth.middleware.js';

const router = express.Router()


// Rutas públicas 
router.route("/getAll").get(productController.getAll);
router.route("/:id").get(productController.getById);


//Rutas del admin

router.route("/create").post(verificarToken, esAdmin, productController.create);

router.route("/update").put(verificarToken, esAdmin, productController.update);

router.route("/delete/:id").delete(verificarToken, esAdmin, productController.delete);
export default router