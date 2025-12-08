import CadVolForm from '../../components/CadVolForm';
import Header from '../../components/Header';
import NomePags from '../../components/NomePags';
import style from './CadVolPage.module.css'
import { useParams } from 'react-router-dom';

function CadVolPage() {

    const { id } = useParams();
    const titulo = id ? 'Editar Voluntário' : 'Cadastrar Voluntário';
    return (
        <div className={style.CadVolPage}>
            <Header />
            <article>
                <NomePags nome={titulo} />
                <CadVolForm />
            </article>
        </div>
    );
}

export default CadVolPage;
