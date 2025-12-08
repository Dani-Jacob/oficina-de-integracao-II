import CadOficinaForm from '../../components/CadOficinaForm';
import Header from '../../components/Header';
import NomePags from '../../components/NomePags';
import style from './CadOficinaPage.module.css'
import { useParams } from 'react-router-dom';

function CadOficinaPage() {
    const { officinaId } = useParams();
    const titulo = officinaId ? 'Editar Oficina' : 'Cadastrar Oficina';

    return (
        <div className={style.CadOficinaPage}>
            <Header />
            <article>
                <NomePags nome={titulo} />
                <CadOficinaForm />
            </article>
        </div>
    );
}

export default CadOficinaPage;
