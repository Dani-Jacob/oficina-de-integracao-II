import LoginForm from '../../components/LoginForm';
import style from './Login.module.css'

function Login() {
    return (
        <div className={style.Login} >
            <LoginForm />
        </div>
    );
}

export default Login;