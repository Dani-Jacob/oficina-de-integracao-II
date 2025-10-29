import mongoose from 'mongoose';

const voluntarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now
    },
    cpf:{
        type: String,
        unique: true
    },
    dataNascimento:{
        type: Date,
        required: true,
    },
    funcao:{
        type: String,
        required: true
    },
    status:{
        type: ativo | inativo,
        required: true
    },
    dataInicioVoluntariado:{
        type: Date,
        required: true,
    },
    dataFimVoluntatiado:{
        type: Date,
        required: true,
    },
    curso:{
        type: String,
        required: true
    }
});

const Voluntario = mongoose.model('Voluntario', voluntarioSchema, 'voluntarios');

export default Voluntario;
