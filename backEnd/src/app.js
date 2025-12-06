import dotenv from 'dotenv';
import express from 'express';
//ROTAS
import loginRoutes from './routes/loginRoute.js';
import voluntarioRoutes from './routes/voluntarioRoute.js'

dotenv.config();
const app = express();
import cors from 'cors';

app.use(express.json())

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//ROTAS
app.use('/login', loginRoutes);
app.use('/voluntarios', voluntarioRoutes)

export default app;