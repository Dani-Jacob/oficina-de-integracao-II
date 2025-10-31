import mongoose from 'mongoose';
import Voluntario from '../models/voluntarioModel.js';
import bcrypt from 'bcrypt';

async function getVoluntario(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID de voluntário inválido' });
  }

  try {
    const voluntario = await Voluntario.findById(id).select("-senha");

    if (!voluntario) {
      return res.status(404).json({ error: 'Voluntário não encontrado' });
    }

    return res.json({ voluntario });
  } catch (err) {
    console.error('Erro ao buscar voluntário:', err);
    return res.status(500).json({ error: 'Erro interno ao buscar voluntário' });
  }
}

async function inserirVoluntario(req, res) {
  try {
    const {
      nome,
      email,
      senha,
      cpf,
      dataNascimento,
      funcao,
      status,
      dataInicioVoluntariado,
      dataFimVoluntariado,
      curso
    } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoVoluntario = new Voluntario({
      nome,
      email,
      senha: senhaHash,
      cpf,
      dataNascimento,
      funcao,
      status,
      dataInicioVoluntariado,
      dataFimVoluntariado,
      curso
    });

    const salvo = await novoVoluntario.save();

    res.status(201).json({
      message: 'Voluntário cadastrado com sucesso!',
      voluntario: salvo
    });
  } catch (error) {
    if (error.code === 11000) {
      const campoDuplicado = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ message: `O campo '${campoDuplicado}' já está cadastrado.` });
    }

    res.status(500).json({
      message: 'Erro ao cadastrar voluntário.',
      error: error.message
    });
  }
}

export { getVoluntario, inserirVoluntario }
