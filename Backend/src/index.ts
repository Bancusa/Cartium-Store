import express, { type Request, type Response } from 'express';
import productsRouter  from './routes/products.routes.js';

const app = express();

const PORT = 4000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`⚡️ Servidor encendido en: http://localhost:${PORT}`);
});

app.get('/', (req: Request, res: Response) => {
    res.send('SERVER ON');
});

app.use("/products", productsRouter)

























/* //ENCENDIDO DE SERVIDOR ( npx nodemon src/index.ts )
import express, { type Request, type Response } from 'express';

const app = express();
const PORT = 3000;

// Configuración para que el servidor entienda datos JSON
app.use(express.json());

// Encendemos el servidor
app.listen(PORT, () => {
    console.log(`⚡️ Servidor encendido en: http://localhost:${PORT}`);
});


//DB
const listaDeProductos = [
        { id: 1, nombre: "Mouse bueno", precio: 25000 },
        { id: 2, nombre: "Teclado Mecánico", precio: 45000 },
        { id: 3, nombre: "Teclado Mecánico", precio: 45000 },
        { id: 4, nombre: "Teclado Mecánico", precio: 45000 },
        { id: 5, nombre: "Teclado Mecánico", precio: 45000 },
        { id: 6, nombre: "Teclado Mecánico", precio: 45000 },
        { id: 7, nombre: "Teclado Mecánico", precio: 45000 },
    ];

// HTTPS
// Ruta principal: esto es lo que verás al entrar a http://localhost:3000
app.get('/', (req: Request, res: Response) => {
    res.send('SERVER ON');
});

// Ruta de productos: simulamos una pequeña base de datos
app.get('/products/getAll', (req: Request, res: Response) => {
    res.json(listaDeProductos);
});

app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    res.json(listaDeProductos.filter(p => p.id.toString() === id));
});

app.delete('/products/delete/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const productFiltered = listaDeProductos.filter(p => p.id.toString() !== id)
    res.json(productFiltered);
}); */


//IDEAL
/* import express, { type Request, type Response } from 'express';

const app = express();
const router = express.Router()
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`⚡️ Servidor encendido en: http://localhost:${PORT}`);
});

app.get('/', (req: Request, res: Response) => {
    res.send('SERVER ON');
});

router.get("/products", productsController)
router.get("/brand", brandController) */
