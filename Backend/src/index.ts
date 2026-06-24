import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import productsRouter from './routes/products.routes.js';
import usersRoutes from './routes/users.routes.js';
import pagosRoutes from './routes/pagos.routes.js';
import {manejadorErroresGlobal} from './middleware/error.middleware.js';

const app = express();
const PORT = 4000;

// middlewares globales
app.use(cors());
app.use(express.json()); 

app.get('/', (req: Request, res: Response) => {
    res.send('SERVER ON');
});

// agregamos api a la ruta de productos para unificar
app.use('/api/productos', productsRouter);
app.use('/api/usuarios', usersRoutes);
app.use('/api/pagos', pagosRoutes);

console.log("El servidor lee el token?:", process.env.MERCADOPAGO_ACCESS_TOKEN ? "SI, ESTA CARGADO 🗿" : "NO, ESTA VACIO");

app.use(manejadorErroresGlobal);

// levantamos el servidor en la ip local
app.listen(PORT, () => {
    console.log(`⚡️ Servidor encendido en: http://localhost:${PORT}`);
});