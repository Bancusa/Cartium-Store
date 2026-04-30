import express from 'express';
import productController from "../controller/producto.controller.js"

const router = express.Router()

router.route("/getAll").get(productController.getAll)
router.route("/delete").get(productController.delete)
router.route("/create").get(productController.create)
router.route("/update").get(productController.update)
router.route("/:id").get(productController.getById)

export default router