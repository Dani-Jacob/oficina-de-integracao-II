import { useForm } from 'react-hook-form';
import Input from '../Input';
import style from './CadVolForm.module.css'
import Select from '../Select';
import Radio from '../Radio';
import Submit from '../Submit'
import ButtonLink from '../ButtonLink';
import { cadastrarVolunario, getVoluntario, updateVoluntario } from '../../Services/voluntariosService'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PopUp from '../PopUp';

function CadVolForm() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [mensagemPopUp, setMensagemPopUp] = useState(null);
    const [error, setError] = useState('');
    const { id } = useParams();

    const onSubmit = async (data) => {
        try {
            data.ativo = data.ativo === 'true';
            if (id) {
                await updateVoluntario(id, data);
            } 
            else {
            await cadastrarVolunario(data);
            console.log(data)
        }
            setMensagemPopUp({ titulo: 'Voluntário Cadastrado', mensagem: 'Voluntário cadastrado com sucesso!' });
        }
        catch (err) {
            setMensagemPopUp({ titulo: 'Voluntário não cadastrado', mensagem: err.message });
            setError(err.message)
        }
        setTimeout(() => setMensagemPopUp(null), 3000);
    }


    useEffect(() => {
        const getvo = async () => {
            if (id) {
                try {
                    const response = await getVoluntario(id);
                    console.log(response)
                                 // Função para formatar data ISO para YYYY-MM-DD
                const formatarData = (data) => {
                    if (!data) return '';
                    return new Date(data).toISOString().split('T')[0];
                };
                
                reset({ 
                    ...response.voluntario,
                    dataNascimento: formatarData(response.voluntario.dataNascimento),
                    dataInicioVoluntariado: formatarData(response.voluntario.dataInicioVoluntariado),
                    dataFimVoluntariado: formatarData(response.voluntario.dataFimVoluntariado),
                    ativo: String(response.voluntario.ativo || response.ativo)
                });
                }
                catch (err) {
                    setError(err.message)
                }
            }
        }
        getvo();
    },
        []
    )

    return (
        <>
        {mensagemPopUp && <PopUp titulo={mensagemPopUp.titulo} mensagem={mensagemPopUp.mensagem} />}
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>

            <Input
                label='Nome'
                name='nome'
                errors={errors}
                validationRules={{ required: 'Campo Obrigatório', minLength: { value: 3, message: 'Nome deve ter pelo menos 3 caracteres' } }}
                register={register}
            />
          <Input
                        label='Data Nascimento'
                        name='dataNascimento'
                        errors={errors}
                        validationRules={{ required: 'Campo Obrigatório' }}
                        register={register}
                        type='date'
                    />

            <section className={style.RaTelCpf}>
                <Input
                    label='RA'
                    name='ra'
                    errors={errors}
                    validationRules={{ required: 'Campo Obrigatório' }}
                    register={register}
                />
                <Input
                    label='CPF'
                    name='cpf'
                    errors={errors}
                    validationRules={{
                        required: 'Campo Obrigatório',
                        minLength: {
                            value: 11,
                            message: 'O CPF deve ter exatamente 11 dígitos.',
                        },
                        maxLength: {
                            value: 11,
                            message: 'O CPF deve ter exatamente 11 dígitos.',
                        },
                    }}
                    placeholder='00000000000'
                    register={register}
                    type='number'
                />
            </section>
            <Input
                label='Email'
                name='email'
                errors={errors}
                validationRules={{
                    required: 'Campo Obrigatório',
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Email inválido'
                    }

                }}
                register={register}
            />
            {!id && (<Input
                label='Senha'
                name='senha'
                errors={errors}
                validationRules={{
                    required: 'Campo Obrigatório',
                    minLength: {
                        value: 6,
                        message: 'A senha deve ter no mínimo 6 dígitos.',
                    }
                }}
                register={register}
            />)}
         
            <section className={style.cursoSituacao}>
                <Select
                    label='Curso'
                    name='curso'
                    register={register}
                    errors={errors}
                    options={[
                        { value: 'engenharia de softwate', label: 'engenharia de softwate' },
                        { value: 'analise e dev de sistemas', label: 'analise e dev de sistemas' },
                        { value: 'computacao', label: 'computacao' },
                    ]}
                    validationRules={{ required: 'Campo Obrigatório' }}
                />
                <Input
                        label='Data Início Voluntariado'
                        name='dataInicioVoluntariado'
                        errors={errors}
                        
                        register={register}
                        type='date'
                    />
                    <Input
                        label='Data Fim Voluntariado'
                        name='dataFimVoluntariado'
                        errors={errors}
                        validationRules={{ required: 'Campo Obrigatório' }}
                        register={register}
                        type='date'
                    />
                <Radio
                    label='Status'
                    name='status'
                    register={register}
                    errors={errors}
                    options={[
                        { value: 'ativo', label: 'Ativo' },
                        { value: 'inativo', label: 'Inativo' }
                    ]}
                    validationRules={{ required: 'Campo Obrigatório' }} />
            </section>

            <Select
                label='Função'
                name='funcao'
                register={register}
                errors={errors}
                options={[
                        { value: 'administrador', label: 'Administrador' },
                        { value: 'usuario', label: 'Usuário' }
                    ]}
                validationRules={{ required: 'Campo Obrigatório' }}
            />

            <section className={style.buttons}>
                <Submit
                    label={id ? 'Atualizar' : 'Cadastrar'}
                    handleSubmit={onSubmit}
                />
                <ButtonLink
                    to='/ListaDeVoluntarios'
                    label='Lista De Voluntários'
                />
            </section>
        </form>
        </>
    )
}

export default CadVolForm;
