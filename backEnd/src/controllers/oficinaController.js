import mongoose from 'mongoose';
import Voluntario from '../models/voluntarioModel.js';

async function getOficinas(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID de voluntário inválido' });
  }

  try {
    const voluntario = await Voluntario.findById(id).select('oficinas');

    if (!voluntario) {
      return res.status(404).json({ error: 'Voluntário não encontrado' });
    }

    return res.json({ oficinas: voluntario.oficinas || [] });
  } catch (err) {
    console.error('Erro ao buscar oficinas:', err);
    return res.status(500).json({ error: 'Erro interno ao buscar oficinas' });
  }
}

async function getOficina(req, res) {
  const { id, oficinaId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID de voluntário inválido' });
  }

  try {
    const voluntario = await Voluntario.findById(id);

    if (!voluntario) {
      return res.status(404).json({ error: 'Voluntário não encontrado' });
    }

    const oficina = voluntario.oficinas.id(oficinaId);

    if (!oficina) {
      return res.status(404).json({ error: 'Oficina não encontrada' });
    }

    return res.json({ oficina });
  } catch (err) {
    console.error('Erro ao buscar oficina:', err);
    return res.status(500).json({ error: 'Erro interno ao buscar oficina' });
  }
}

async function adicionarOficina(req, res) {
  const { id } = req.params;
  const { nome, dataInicio, dataFim, funcao } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID de voluntário inválido' });
  }

  if (!nome || !dataInicio || !dataFim || !funcao) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const voluntario = await Voluntario.findById(id);

    if (!voluntario) {
      return res.status(404).json({ error: 'Voluntário não encontrado' });
    }

    const novaOficina = {
      nome,
      dataInicio,
      dataFim,
      funcao
    };

    voluntario.oficinas.push(novaOficina);
    const atualizado = await voluntario.save();

    return res.status(201).json({
      message: 'Oficina adicionada com sucesso',
      oficina: atualizado.oficinas[atualizado.oficinas.length - 1]
    });
  } catch (err) {
    console.error('Erro ao adicionar oficina:', err);
    return res.status(500).json({ error: 'Erro interno ao adicionar oficina' });
  }
}

async function atualizarOficina(req, res) {
  const { id, oficinaId } = req.params;
  const { nome, dataInicio, dataFim, funcao } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID de voluntário inválido' });
  }

  try {
    const voluntario = await Voluntario.findById(id);

    if (!voluntario) {
      return res.status(404).json({ error: 'Voluntário não encontrado' });
    }

    const oficina = voluntario.oficinas.id(oficinaId);

    if (!oficina) {
      return res.status(404).json({ error: 'Oficina não encontrada' });
    }

    if (nome) oficina.nome = nome;
    if (dataInicio) oficina.dataInicio = dataInicio;
    if (dataFim) oficina.dataFim = dataFim;
    if (funcao) oficina.funcao = funcao;

    await voluntario.save();

    return res.json({
      message: 'Oficina atualizada com sucesso',
      oficina
    });
  } catch (err) {
    console.error('Erro ao atualizar oficina:', err);
    return res.status(500).json({ error: 'Erro interno ao atualizar oficina' });
  }
}

async function removerOficina(req, res) {
  const { id, oficinaId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID de voluntário inválido' });
  }

  try {
    const voluntario = await Voluntario.findById(id);

    if (!voluntario) {
      return res.status(404).json({ error: 'Voluntário não encontrado' });
    }

    const oficina = voluntario.oficinas.id(oficinaId);

    if (!oficina) {
      return res.status(404).json({ error: 'Oficina não encontrada' });
    }

    oficina.deleteOne();
    await voluntario.save();

    return res.json({ message: 'Oficina removida com sucesso' });
  } catch (err) {
    console.error('Erro ao remover oficina:', err);
    return res.status(500).json({ error: 'Erro interno ao remover oficina' });
  }
}

export { getOficinas, getOficina, adicionarOficina, atualizarOficina, removerOficina };
