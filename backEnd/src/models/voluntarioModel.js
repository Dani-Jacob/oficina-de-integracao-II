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
    cpf: {
        type: String,
        unique: true,
        required: true
    },
    dataNascimento: {
        type: Date,
        required: true,
    },
    funcao: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['ativo', 'inativo'],
        required: true
    },
    dataInicioVoluntariado: {
        type: Date,
        required: true,
    },
    dataFimVoluntariado: {
        type: Date,
    },
    curso:{
        type: String,
        required: true
    },
    certificados:[{
        horas: {
            type: Number,
            required: true
        }
    }],
    oficinas:[{
        nome: {
            type: String,
            required: true
        },
        dataInicio: {
            type: Date,
            required: true
        },
        dataFim: {
            type: Date,
            required: true
        },
        funcao: {
            type: String,
            required: true
        }
    }]
},{
    toJSON: {
        transform: (doc, ret) => {
            delete ret.senha;
            return ret;
        }
    }
});

const Voluntario = mongoose.model('Voluntario', voluntarioSchema, 'voluntarios');

export default Voluntario;
