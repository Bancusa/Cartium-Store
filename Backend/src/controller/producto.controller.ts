import { Request, Response } from 'express';
import productService from '../server/products.service.js';

class ProductController {
    
    getAll = async (req: Request, res: Response) => {
        try {
            const products = await productService.getAllServiceProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(404).json("Error");
        }
    }

    delete = (req: Request, res: Response) => { res.status(200).json("producto delete"); }
    update = (req: Request, res: Response) => { res.status(200).json("producto update"); }

    create = async (req: Request, res: Response) => {
        try {
            const productoNuevo = req.body;
            await productService.createServiceProducts(productoNuevo);
            res.status(201).json({ mensaje: "¡Producto guardado con éxito!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Hubo un problema al guardar el producto" });
        }
    }

    getById = (req: Request, res: Response) => { res.status(200).json("producto getById"); }
}

export default new ProductController();