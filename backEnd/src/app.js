import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();

//ROTAS
import loginRoutes from './routes/loginRoute.js';

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//ROTAS
app.use('/login', loginRoutes);



export default app;