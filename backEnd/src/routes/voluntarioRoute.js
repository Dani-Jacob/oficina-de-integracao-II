import express from 'express'
import { listarCertificados, adicionarCertificado, atualizarCertificado, removerCertificado } from '../controllers/certificadoController.js'
import { getVoluntario, inserirVoluntario, atualizarVoluntario, deletarVoluntario } from '../controllers/voluntarioController.js';
import validarToken, {isAdministrador} from '../middlewares/authMiddleware.js';
import { voluntarioValidationRules, validateVoluntario } from '../middlewares/voluntarioValidator.js';

const router = express.Router()

router.use(validarToken);

router.get('/:id', getVoluntario)

router.get('/:id/certificados', listarCertificados);

router.post('/:id/certificados', adicionarCertificado);

router.put('/:id/certificados/:certificadoId', atualizarCertificado);

router.delete('/:id/certificados/:certificadoId', removerCertificado);

// Atualizar voluntário
router.put('/:id', atualizarVoluntario)

// Deletar voluntário
router.delete('/:id', deletarVoluntario)

//POST
router.post('/', 
    isAdministrador, 
    voluntarioValidationRules, 
    validateVoluntario, 
    inserirVoluntario);

export default router;



