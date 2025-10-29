import express from 'express';

import {gerarToken} from '../controllers/loginController.js';


const router = express.Router();

router.post('/token', gerarToken);



export default router;