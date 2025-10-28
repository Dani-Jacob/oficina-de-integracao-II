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
    }
});

const Voluntario = mongoose.model('Voluntario', voluntarioSchema, 'voluntarios');

export default Voluntario;
