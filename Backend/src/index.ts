import express, { type Request, type Response } from 'express';
import productsRouter from './routes/products.routes.js';
import usersRoutes from './routes/users.routes.js';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json()); 

app.get('/', (req: Request, res: Response) => {
    res.send('SERVER ON');
});

app.use("/products", productsRouter);
app.use('/api/usuarios', usersRoutes);

app.listen(PORT, '127.0.0.1', () => {
    console.log(`⚡️ Servidor encendido en: http://127.0.0.1:${PORT}`);
});