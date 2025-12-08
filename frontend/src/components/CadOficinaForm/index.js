import { useForm } from 'react-hook-form';
import Input from '../Input';
import style from './CadOficinaForm.module.css'
import Select from '../Select';
import Submit from '../Submit'
import ButtonLink from '../ButtonLink';
import { adicionarOficina, getOficina, atualizarOficina } from '../../Services/oficinasService'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PopUp from '../PopUp';

function CadOficinaForm() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [mensagemPopUp, setMensagemPopUp] = useState(null);
    const [error, setError] = useState('');
    const { id, oficinaId } = useParams();

    const onSubmit = async (data) => {
        try {
            if (oficinaId) {
                await atualizarOficina(id, oficinaId, data);
                setMensagemPopUp({ titulo: 'Oficina Atualizada', mensagem: 'Oficina atualizada com sucesso!' });
            } 
            else {
                console.log("voluntario id" + id)
                await adicionarOficina(id, data);
                setMensagemPopUp({ titulo: 'Oficina Cadastrada', mensagem: 'Oficina cadastrada com sucesso!' });
            }
            reset();
        }
        catch (err) {
            setMensagemPopUp({ titulo: 'Erro ao processar oficina', mensagem: err.message });
            setError(err.message)
        }
        setTimeout(() => setMensagemPopUp(null), 3000);
    }


    useEffect(() => {
        const getOficinaData = async () => {
            if (oficinaId && id) {
                try {
                    const response = await getOficina(id, oficinaId);
                    console.log(response)
                    
                    const formatarData = (data) => {
                        if (!data) return '';
                        return new Date(data).toISOString().split('T')[0];
                    };
                    
                    reset({ 
                        ...response.oficina,
                        dataInicio: formatarData(response.oficina.dataInicio),
                        dataFim: formatarData(response.oficina.dataFim),
                    });
                }
                catch (err) {
                    setError(err.message)
                }
            }
        }
        getOficinaData();
    },
        []
    )

    return (
        <>
        {mensagemPopUp && <PopUp titulo={mensagemPopUp.titulo} mensagem={mensagemPopUp.mensagem} />}
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>

            <Input
                label='Nome da Oficina'
                name='nome'
                errors={errors}
                validationRules={{ required: 'Campo Obrigatório', minLength: { value: 3, message: 'Nome deve ter pelo menos 3 caracteres' } }}
                register={register}
            />

            <section className={style.datas}>
                <Input
                    label='Data Início'
                    name='dataInicio'
                    errors={errors}
                    validationRules={{ required: 'Campo Obrigatório' }}
                    register={register}
                    type='date'
                />
                <Input
                    label='Data Fim'
                    name='dataFim'
                    errors={errors}
                    validationRules={{ required: 'Campo Obrigatório' }}
                    register={register}
                    type='date'
                />
            </section>

            <Input
                label='Função'
                name='funcao'
                errors={errors}
                validationRules={{ required: 'Campo Obrigatório', minLength: { value: 3, message: 'Nome deve ter pelo menos 3 caracteres' } }}
                register={register}
            />

            <section className={style.buttons}>
                <Submit
                    label={oficinaId ? 'Atualizar' : 'Cadastrar'}
                    handleSubmit={onSubmit}
                />
                <ButtonLink
                    to={`/voluntarios/${id}/oficinas`}
                    label='Voltar'
                />
            </section>
        </form>
        </>
    )
}

export default CadOficinaForm;
