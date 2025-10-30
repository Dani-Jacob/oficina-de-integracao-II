import express from 'express'
import { listarCertificados, adicionarCertificado, atualizarCertificado, removerCertificado } from '../controllers/certificadoController.js'
import { getVoluntario, inserirVoluntario } from '../controllers/voluntarioController.js';
import validarToken, {isAdministrador} from '../middlewares/authMiddleware.js';

const router = express.Router()

router.use(validarToken);

router.get('/:id', getVoluntario)

router.get('/:id/certificados', listarCertificados);

router.post('/:id/certificados', adicionarCertificado);

router.put('/:id/certificados/:certificadoId', atualizarCertificado);

router.delete('/:id/certificados/:certificadoId', removerCertificado);


//POST
router.post('/', isAdministrador, inserirVoluntario);

export default router;



