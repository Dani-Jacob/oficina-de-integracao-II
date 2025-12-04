import style from './NomePags.module.css';

function NomePags(props){
    return (
        <div className={style.NomePags}>
            <h1>{props.nome}</h1>
        </div>
    );
}

export default NomePags;