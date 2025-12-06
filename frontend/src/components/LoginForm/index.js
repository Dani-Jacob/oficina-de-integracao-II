import style from './LoginForm.module.css';
import { useState } from 'react';
import { login } from '../../Services/authService'
import { useNavigate } from 'react-router-dom';

function LoginForm() {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        senha: ''
    });
    const [error, setError] = useState('');
    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            await login(values)
            navigate('/Home');
        }
        catch (erro) {
            setError(erro.message)
        }

    }

    return (
        <div className={style.loginForm}>
            <img src='/images/Logotipo (Transparente) (1).png' alt='Logo do ELLP' />
            <h2>Sistema de gerênciamento de voluntários e oficinas</h2>
            <form onSubmit={handleSubmit}>
                <section>
                    <label htmlFor='user'>Usuário</label>
                    <input type='text' id='user' name='email' placeholder='Usuário' onChange={(e) => handleChanges(e)} required />
                    <label htmlFor='password'>Senha</label>
                    <input type='password' id='password' name='senha' placeholder='Senha' onChange={(e) => handleChanges(e)} required />
                </section>
                {<p className={style.error}>{error}</p>}
                <button type='submit'>Entrar</button>

            </form>
        </div>
    )
}

export default LoginForm;
