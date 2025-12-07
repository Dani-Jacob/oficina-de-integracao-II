import express from 'express'
import { listarCertificados, adicionarCertificado, atualizarCertificado, removerCertificado } from '../controllers/certificadoController.js'
import { getVoluntario, inserirVoluntario, atualizarVoluntario, deletarVoluntario, getVoluntarios } from '../controllers/voluntarioController.js';
import { getOficinas, getOficina, adicionarOficina, atualizarOficina, removerOficina } from '../controllers/oficinaController.js';
import validarToken, {isAdministrador} from '../middlewares/authMiddleware.js';
import { voluntarioValidationRules, voluntarioUpdateValidationRules ,validateVoluntario } from '../middlewares/voluntarioValidator.js';

const router = express.Router()

router.use(validarToken);

//Voluntários
router.get('/', getVoluntarios);

router.get('/:id', getVoluntario);

router.put('/:id',voluntarioUpdateValidationRules, validateVoluntario ,atualizarVoluntario)

router.delete('/:id', deletarVoluntario)

router.post('/', 
    isAdministrador, 
    voluntarioValidationRules, 
    validateVoluntario, 
    inserirVoluntario);

//Oficinas
router.get('/:id/oficinas', getOficinas);

router.get('/:id/oficinas/:oficinaId', getOficina);

router.post('/:id/oficinas', adicionarOficina);

router.put('/:id/oficinas/:oficinaId', atualizarOficina);

router.delete('/:id/oficinas/:oficinaId', removerOficina);

//Certificados
router.get('/:id/certificados', listarCertificados);

router.post('/:id/certificados', adicionarCertificado);

router.put('/:id/certificados/:certificadoId', atualizarCertificado);

router.delete('/:id/certificados/:certificadoId', removerCertificado);


export default router;



