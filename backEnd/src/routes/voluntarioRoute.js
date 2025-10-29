import express from 'express'
import { getVoluntario } from '../controller/voluntarioController.js'

const router = express.Router()

// passar a função como handler (não chamá-la agora)
router.get('/:id', getVoluntario)

export default router



