import CadCertificadoForm from '../../components/CadCertificadoForm';
import Header from '../../components/Header';
import NomePags from '../../components/NomePags';
import style from './CadCertificadoPage.module.css'
import { useParams } from 'react-router-dom';

function CadCertificadoPage() {
    const { certificadoId } = useParams();
    const titulo = certificadoId ? 'Editar Certificado' : 'Cadastrar Certificado';

    return (
        <div className={style.CadCertificadoPage}>
            <Header />
            <article>
                <NomePags nome={titulo} />
                <CadCertificadoForm />
            </article>
        </div>
    );
}

export default CadCertificadoPage;
