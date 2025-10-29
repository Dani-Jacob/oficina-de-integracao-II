import express from 'express'
import { getVoluntario } from '../controller/voluntarioController.js'
import validarToken from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get('/:id', validarToken, getVoluntario)

export default router



