import CadVolForm from '../../components/CadVolForm';
import Header from '../../components/Header';
import NomePags from '../../components/NomePags';
import style from './CadVolPage.module.css'

function CadVolPage() {
    return (
        <div className={style.CadVolPage}>
            <Header />
            <article>
                <NomePags nome='Cadastrar Voluntário' />
                <CadVolForm />
            </article>
        </div>
    );
}

export default CadVolPage;
