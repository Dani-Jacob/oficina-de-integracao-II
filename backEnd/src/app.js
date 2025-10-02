import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';



dotenv.config();

const app = express();


//Middlewares
app.use(express.json())


export default app;