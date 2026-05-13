//DB

import { conectarDB } from '../DB/database.js'; 

class ProductRepository {
    
    
    async getAll() {
        const db = await conectarDB(); // Abrimos la puerta del depósito
        
        // Hacemos la consulta SQL real para traer todo
        const [rows] = await db.query('SELECT * FROM productos'); 
        
        return rows; // Devolvemos los productos reales
    }

    
    getById(id: string) {}
    delete = () => {}
    update = () => {}

    async create(producto: any) {
    const db = await conectarDB();
    // El products_id no se pone acá porque MySQL lo genera solo
    const sql = 'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)';
    const values = [producto.nombre, producto.descripcion, producto.precio, producto.stock];
    
    const [result] = await db.query(sql, values);
    return result;
}
}

export default new ProductRepository();