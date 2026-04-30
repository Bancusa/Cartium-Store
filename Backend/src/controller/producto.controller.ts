import { Request, Response } from 'express';
import  productService from "../server/products.service.js"


class ProductController {
    getAll = (req: Request, res: Response) => {
            try {
                const products = productService.getAllServiceProducts();
                res.status(200).json(products);
            } catch (error) {
                res.status(404).json("El cielo se cae");
            }
    }
    delete = (req: Request, res: Response) =>{res.status(200).json("producto delete");}
    update = (req: Request, res: Response) =>{res.status(200).json("producto update");}
    create = (req: Request, res: Response) =>{res.status(200).json("producto create");}
    getById = (req: Request, res: Response) =>{res.status(200).json("producto getById");}
}

export default new ProductController()
