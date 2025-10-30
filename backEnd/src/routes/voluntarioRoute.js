import express from 'express';
import { getVoluntario, inserirVoluntario } from '../controllers/voluntarioController.js';
import validarToken, {isAdministrador} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(validarToken);

router.get('/:id', getVoluntario);

//POST
router.post('/', isAdministrador, inserirVoluntario);

export default router;



