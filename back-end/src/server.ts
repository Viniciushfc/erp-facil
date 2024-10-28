import express from 'express';
import cors from 'cors';
import produtoRoutes from './routes/produtoRoutes';
import { createTables } from './database';
import funcionarioRoutes from './routes/funcionarioRoutes';
import clienteRoutes from './routes/clienteRoutes';

const app = express();
const PORT = 3000;


app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createTables();

app.use(produtoRoutes);
app.use(funcionarioRoutes);
app.use(clienteRoutes);


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
