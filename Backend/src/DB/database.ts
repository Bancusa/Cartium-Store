import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Creamos un pool de conexiones en lugar de una conexion unica
const conexion = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cartium_db',
    waitForConnections: true,
    connectionLimit: 10, // Maximo de conexiones simultaneas que va a manejar
    queueLimit: 0
});

// Funcion para verificar que la base de datos responda al levantar el server
export const conectarDB = async () => {
    try {
        const poolConexion = await conexion.getConnection();
        console.log('Base de datos conectada de forma exitosa mediante Pool 🚀');
        poolConexion.release(); // Importante: liberamos la conexion para que vuelva al pool
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        process.exit(1);
    }
};

export default conexion;