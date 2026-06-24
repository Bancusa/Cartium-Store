import conexion from '../DB/database.js'; 

class ProductRepository {
    
    async getAll() {
        // hacemos la consulta sql real para traer todo
        const [rows] = await conexion.execute('SELECT * FROM productos'); 
        return rows;
    }

    getById(id: string) {}
    delete = () => {}
    update = () => {}

    async create(producto: any) {
        // el products id no se pone aca porque mysql lo genera solo
        const sql = 'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)';
        const values = [producto.nombre, producto.descripcion, producto.precio, producto.stock];
        
        const [result] = await conexion.execute(sql, values);
        return result;
    }
}

export default new ProductRepository();