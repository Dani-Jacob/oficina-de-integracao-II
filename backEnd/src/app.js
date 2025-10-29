import dotenv from 'dotenv';
import express from 'express';
import voluntarioRoutes from './routes/voluntarioRoute.js'


dotenv.config();
const app = express();

app.use(express.json())

app.use('/voluntarios', voluntarioRoutes)

export default app;