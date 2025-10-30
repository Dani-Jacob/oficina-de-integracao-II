import mongoose from 'mongoose'
import Voluntario from '../models/voluntarioModel.js'

async function getVoluntario(req, res){
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID de voluntário inválido' })
  }

  try {
    const voluntario = await Voluntario.findById(id).select("-senha")

    if (!voluntario) {
      return res.status(404).json({ error: 'Voluntário não encontrado' })
    }

    return res.json({ voluntario })
  } catch (err) {
    console.error('Erro ao buscar voluntário:', err)
    return res.status(500).json({ error: 'Erro interno ao buscar voluntário' })
  }
}

export {getVoluntario}
