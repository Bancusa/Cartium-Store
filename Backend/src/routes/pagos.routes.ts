import { Router } from 'express'
import { crearPreferencia, guardarFactura, obtenerFacturas } from '../controller/pagos.controller.js'

const router = Router()

router.post('/crear-preferencia', crearPreferencia)
router.post('/guardar-factura', guardarFactura)
router.get('/facturas/:email', obtenerFacturas)

export default router