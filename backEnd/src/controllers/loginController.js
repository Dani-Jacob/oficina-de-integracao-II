import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Voluntario from '../models/voluntarioModel.js';

async function gerarToken(req, res) {
    const { email, senha } = req.body;
    try {
        if (email == null || senha == null) {
            return res.status(401).json({ message: 'Email e senha são obrigatórios' });
        }
        const voluntario = await Voluntario.findOne({ email });
        if (!voluntario) {
            return res.status(403).json({ message: 'Credenciais inválidas' });
        }


        const senhasIguais = await bcrypt.compare(senha, voluntario.senha);
        //const senhasIguais = senha == voluntario.senha;
        if (!senhasIguais) {
            return res.status(403).json({ message: 'Credenciais inválidas' });
        }

        const payload = {
            id: voluntario._id,
            nome: voluntario.nome,
            email: voluntario.email,
            funcao: voluntario.funcao
        };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'fusca', {
            expiresIn: '1h',
        });

        return res.json({ token, user: payload, expiresIn: 3600 });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
}


export { gerarToken };