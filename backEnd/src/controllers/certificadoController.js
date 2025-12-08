import mongoose from 'mongoose';
import Voluntario from '../models/voluntarioModel.js';

export const listarCertificados = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID de voluntário inválido' });
    }

    try {
        const voluntario = await Voluntario.findById(id).select('certificados');
        
        if (!voluntario) {
            return res.status(404).json({ error: 'Voluntário não encontrado' });
        }

        return res.json(voluntario.certificados);
    } catch (err) {
        console.error('Erro ao listar certificados:', err);
        return res.status(500).json({ error: 'Erro interno ao buscar certificados' });
    }
};

export const obterCertificado = async (req, res) => {
    const { id, certificadoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID de voluntário inválido' });
    }

    try {
        const voluntario = await Voluntario.findById(id);

        if (!voluntario) {
            return res.status(404).json({ error: 'Voluntário não encontrado' });
        }

        const certificado = voluntario.certificados.id(certificadoId);

        if (!certificado) {
            return res.status(404).json({ error: 'Certificado não encontrado' });
        }

        return res.json({ certificado });
    } catch (err) {
        console.error('Erro ao buscar certificado:', err);
        return res.status(500).json({ error: 'Erro interno ao buscar certificado' });
    }
};

export const adicionarCertificado = async (req, res) => {
    const { id } = req.params;
    const { nome, horas} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID de voluntário inválido' });
    }

    let horas_float;
    try {
        horas_float = parseFloat(horas);
        if (isNaN(horas_float) || horas_float <= 0) {
            return res.status(400).json({ error: 'Horas do certificado inválidas' });
        }
    } catch (e) {
        console.log(e);
        return res.status(400).json({ error: 'Horas do certificado inválidas' });
    }

    try {
        const voluntario = await Voluntario.findById(id);
        
        if (!voluntario) {
            return res.status(404).json({ error: 'Voluntário não encontrado' });
        }

        voluntario.certificados.push({
            nome,
            horas: horas_float
        });
        await voluntario.save();

        return res.status(201).json(voluntario.certificados[voluntario.certificados.length - 1]);
    } catch (err) {
        console.error('Erro ao adicionar certificado:', err);
        return res.status(500).json({ error: 'Erro interno ao adicionar certificado' });
    }
};

export const atualizarCertificado = async (req, res) => {
    const { id, certificadoId } = req.params;
    const { nome, horas } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID de voluntário inválido' });
    }

    if (!mongoose.Types.ObjectId.isValid(certificadoId)) {
        return res.status(400).json({ error: 'ID de certificado inválido' });
    }

    let horas_float;
    try {
        horas_float = parseFloat(horas);
        if (isNaN(horas_float) || horas_float <= 0) {
            return res.status(400).json({ error: 'Horas do certificado inválidas' });
        }
    } catch (e) {
        console.log(e);
        return res.status(400).json({ error: 'Horas do certificado inválidas' });
    }

    try {
        const voluntario = await Voluntario.findById(id);

        if (!voluntario) {
            return res.status(404).json({ error: 'Voluntário não encontrado' });
        }

        const certificado = voluntario.certificados.find(
            cert => cert._id.toString() === certificadoId
        );

        if (!certificado) {
            return res.status(404).json({ error: 'Certificado não encontrado' });
        }

        certificado.nome = nome;
        certificado.horas = horas_float;

        await voluntario.save();

        return res.json(certificado);
    } catch (err) {
        console.error('Erro ao atualizar certificado:', err);
        return res.status(500).json({ error: 'Erro interno ao atualizar certificado' });
    }
};

export const removerCertificado = async (req, res) => {
    const { id, certificadoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID de voluntário inválido' });
    }

    if (!mongoose.Types.ObjectId.isValid(certificadoId)) {
        return res.status(400).json({ error: 'ID de certificado inválido' });
    }

    try {
        const voluntario = await Voluntario.findById(id);
        
        if (!voluntario) {
            return res.status(404).json({ error: 'Voluntário não encontrado' });
        }

        const certificadoIndex = voluntario.certificados.findIndex(
            cert => cert._id.toString() === certificadoId
        );

        if (certificadoIndex === -1) {
            return res.status(404).json({ error: 'Certificado não encontrado' });
        }

        voluntario.certificados.splice(certificadoIndex, 1);
        await voluntario.save();

        return res.status(204).send();
    } catch (err) {
        console.error('Erro ao remover certificado:', err);
        return res.status(500).json({ error: 'Erro interno ao remover certificado' });
    }
};