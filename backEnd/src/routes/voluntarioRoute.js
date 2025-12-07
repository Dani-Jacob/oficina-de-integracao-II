import express from 'express'
import { listarCertificados, adicionarCertificado, atualizarCertificado, removerCertificado } from '../controllers/certificadoController.js'
import { getVoluntario, inserirVoluntario, atualizarVoluntario, deletarVoluntario, getVoluntarios } from '../controllers/voluntarioController.js';
import validarToken, {isAdministrador} from '../middlewares/authMiddleware.js';
import { voluntarioValidationRules, voluntarioUpdateValidationRules ,validateVoluntario } from '../middlewares/voluntarioValidator.js';

const router = express.Router()

//router.use(validarToken);

router.get('/', getVoluntarios);

router.get('/:id', getVoluntario);

router.get('/:id/certificados', listarCertificados);

router.post('/:id/certificados', adicionarCertificado);

router.put('/:id/certificados/:certificadoId', atualizarCertificado);

router.delete('/:id/certificados/:certificadoId', removerCertificado);

router.put('/:id',voluntarioUpdateValidationRules, validateVoluntario ,atualizarVoluntario)

router.delete('/:id', deletarVoluntario)

router.post('/', 
    //isAdministrador, 
    voluntarioValidationRules, 
    validateVoluntario, 
    inserirVoluntario);

export default router;



