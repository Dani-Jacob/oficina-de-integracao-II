import express from 'express'
import { getVoluntario } from '../controllers/voluntarioController.js'
import validarToken from '../middlewares/authMiddleware.js'
import { listarCertificados, adicionarCertificado, atualizarCertificado, removerCertificado } from '../controllers/certificadoController.js'

const router = express.Router()

router.use(validarToken);

router.get('/:id', getVoluntario)

router.get('/:id/certificados', listarCertificados);

router.post('/:id/certificados', adicionarCertificado);

router.put('/:id/certificados/:certificadoId', atualizarCertificado);

router.delete('/:id/certificados/:certificadoId', removerCertificado);


export default router



