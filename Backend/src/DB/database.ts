import mysql from 'mysql2/promise';

export async function conectarDB() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'cartium_db'
    });


    console.log("✅ Conexión a MySQL establecida");
    return connection;
}