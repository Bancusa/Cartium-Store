import { Request, Response } from 'express';
import productService from '../server/products.service.js';
import { conectarDB } from '../DB/database.js';

// clase principal del controlador
class ProductController {  

    // obtener todos los productos
    getAll = async (req: Request, res: Response) => {
        try {
            const products = await productService.getAllServiceProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(404).json("Error");
        }
    }

    // eliminar producto por id
    delete = async (req: Request, res: Response): Promise<void> => { 
        
        try {
            const { id } = req.params;
            const conexion = await conectarDB();

            const query = 'DELETE FROM productos WHERE id = ?';
            const [resultado]: any = await conexion.execute(query, [id]);
            
            await conexion.end();

            if (resultado.affectedRows === 0) {
                res.status(404).json({ message: 'Producto no encontrado' });
                return;
            }

            res.status(200).json({ message: 'Producto eliminado con exito' });
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
    // crear nuevo producto en la base de datos
    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const { nombre, descripcion, precio, stock, categoria } = req.body;
            const conexion = await conectarDB();

            const query = 'INSERT INTO productos (nombre, descripcion, precio, stock, categoria) VALUES (?, ?, ?, ?, ?)';
            await conexion.execute(query, [nombre, descripcion, precio, stock, categoria]);

            await conexion.end();

            res.status(201).json({ message: 'Producto creado con exito' });
        } catch (error) {
            console.error('Error al crear producto:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    // actualizar producto
    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { nombre, descripcion, precio, stock, categoria } = req.body;
            const conexion = await conectarDB();

            const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria = ? WHERE id = ?';
            const [resultado]: any = await conexion.execute(query, [nombre, descripcion, precio, stock, categoria, id]);

            await conexion.end();

            if (resultado.affectedRows === 0) {
                res.status(404).json({ message: 'Producto no encontrado' });
                return;
            }

            res.status(200).json({ message: 'Producto actualizado con exito' });
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    // obtener producto por id
    getById = (req: Request, res: Response) => { 
        res.status(200).json("producto getById"); 
    }
}

export default new ProductController();