import { useForm } from 'react-hook-form';
import Input from '../Input';
import style from './CadCertificadoForm.module.css'
import Select from '../Select';
import Submit from '../Submit'
import ButtonLink from '../ButtonLink';
import { adicionarCertificado, getCertificado, atualizarCertificado } from '../../Services/certificadosService'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PopUp from '../PopUp';

function CadCertificadoForm() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [mensagemPopUp, setMensagemPopUp] = useState(null);
    const [error, setError] = useState('');
    const { id, certificadoId } = useParams();

    const onSubmit = async (data) => {
        try {
            if (certificadoId) {
                await atualizarCertificado(id, certificadoId, data);
                setMensagemPopUp({ titulo: 'Certificado Atualizado', mensagem: 'Certificado atualizado com sucesso!' });
            } 
            else {
                await adicionarCertificado(id, data);
                setMensagemPopUp({ titulo: 'Certificado Cadastrado', mensagem: 'Certificado cadastrado com sucesso!' });
            }
            reset();
        }
        catch (err) {
            setMensagemPopUp({ titulo: 'Erro ao processar certificado', mensagem: err.message });
            setError(err.message)
        }
        setTimeout(() => setMensagemPopUp(null), 3000);
    }


    useEffect(() => {
        const getCertificadoData = async () => {
            if (certificadoId && id) {
                try {
                    const response = await getCertificado(id, certificadoId);
                    console.log(response)
                    reset({ 
                        ...response.certificado,
                    });
                }
                catch (err) {
                    setError(err.message)
                }
            }
        }
        getCertificadoData();
    },
        []
    )

    return (
        <>
        {mensagemPopUp && <PopUp titulo={mensagemPopUp.titulo} mensagem={mensagemPopUp.mensagem} />}
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>

            <Input
                label='Nome do Certificado'
                name='nome'
                errors={errors}
                validationRules={{ required: 'Campo Obrigatório', minLength: { value: 3, message: 'Nome deve ter pelo menos 3 caracteres' } }}
                register={register}
            />

                <Input
                    label='Número de Horas'
                    name='horas'
                    errors={errors}
                    validationRules={{ required: 'Campo Obrigatório', min: { value: 1, message: 'Deve ser maior que 0' } }}
                    register={register}
                    type='number'
                />

            <section className={style.buttons}>
                <Submit
                    label={certificadoId ? 'Atualizar' : 'Cadastrar'}
                    handleSubmit={onSubmit}
                />
                <ButtonLink
                    to={`/voluntarios/${id}/certificados`}
                    label='Voltar'
                />
            </section>
        </form>
        </>
    )
}

export default CadCertificadoForm;
