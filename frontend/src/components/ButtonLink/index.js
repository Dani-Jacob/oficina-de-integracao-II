import { Link } from 'react-router-dom';
import style from './ButtonLink.module.css'

function ButtonLink({to, label, className}){
    return(
        <Link className={`${style.buttonLink} ${className}`} to={to}>{label}</Link>
    );
};

export default ButtonLink;