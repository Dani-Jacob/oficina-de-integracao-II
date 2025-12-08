import style from './Voluntarios.module.css';
import Datagrid from '../../components/DataGrid';
//import NomePags from '../../components/NomePags';
import Header from '../../components/Header';
//import ButtonLink from '../../components/ButtonLink'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClassIcon from '@mui/icons-material/Class';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DescriptionIcon from '@mui/icons-material/Description';
import { IconButton, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getVoluntarios, deleteVoluntario } from '../../Services/voluntariosService.js';
import { gerarTermoVoluntariado } from '../../Services/pdfService.js';

function Voluntarios() {

  const navigate = useNavigate();
  const [voluntarios, setVoluntarios] = useState([]);
  const [error, setError] = useState("");



  useEffect(() => {
    const carregarVoluntarios = async () => {

      try {
        const response = await getVoluntarios();
        setVoluntarios(response.voluntarios);
        console.log(response)
      }
      catch (err) {
        setError(err)
      }

    }
    carregarVoluntarios();
  },
    [])

  const handleDelete = async (id) => {
    const confirm = window.confirm('Confirma exclusão do voluntário?');
    if (!confirm) return;

    try {
      await deleteVoluntario(id);
      // atualizar lista local sem nova requisição
      setVoluntarios((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error('Erro ao deletar voluntário', err);
      setError('Erro ao deletar voluntário');
    }
  }

  const handleShowOficinas = (id) => {
    navigate(`/Voluntarios/${id}/Oficinas`);
  }

  const handleShowCertificados = (id) => {
    navigate(`/Voluntarios/${id}/Certificados`);
  }

  const handleGerarTermo = (voluntario) => {
    try {
      gerarTermoVoluntariado(voluntario);
    } catch (err) {
      console.error('Erro ao gerar termo:', err);
      setError('Erro ao gerar termo de voluntariado');
    }
  }


  const actionColumn = {
    field: 'actions',
    headerName: 'Ações',
    width: 300,
    sortable: false,
    renderCell: (params) => {
      const voluntarioOriginal = voluntarios.find(v => v._id === params.row.id);
      return (
      <div className={style.actionButtons}>

        <IconButton
          onClick={() => handleShowOficinas(params.row.id)}
          color="secondary"
          size="small"
          title="Ver Oficinas"
        >
          <ClassIcon />
        </IconButton>

        <IconButton
          onClick={() => handleShowCertificados(params.row.id)}
          color="success"
          size="small"
          title="Ver Certificados"
        >
          <ReceiptIcon />
          </IconButton>
          
          <IconButton
          onClick={() => handleGerarTermo(voluntarioOriginal)}
          color="success"
          size="small"
          title="Gerar Termo de Voluntariado"
        >
          <DescriptionIcon />
        </IconButton>

        <IconButton
          //Ajustar a parte de editar
          onClick={() => navigate(`/voluntario/${params.row.id}`)}
          color="primary"
          size="small"
          title="Editar"
        >
          <EditIcon />
        </IconButton>

        <IconButton
          onClick={() => handleDelete(params.row.id)}
          color="error"
          size="small"
          title="Excluir"
        >
          <DeleteIcon />
        </IconButton>


      </div>
      );
    },
  };

  const rows = voluntarios.map((vol, index) => ({
    id: vol._id || index,
    nome: vol.nome,
    email: vol.email,
    cpf: vol.cpf,
    funcao: vol.funcao,
    status: vol.status,
    curso: vol.curso,
    dataNascimento: new Date(vol.dataNascimento).toLocaleDateString('pt-BR'),
    dataInicioVoluntariado: new Date(vol.dataInicioVoluntariado).toLocaleDateString('pt-BR'),
    dataFimVoluntariado: vol.dataFimVoluntariado ? new Date(vol.dataFimVoluntariado).toLocaleDateString('pt-BR') : '--',
    totalCertificados: vol.certificados?.length || 0,
    totalOficinas: vol.oficinas?.length || 0,
  }));

  const columns = [
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'cpf', headerName: 'CPF', width: 150 },
    { field: 'curso', headerName: 'Curso', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'dataInicioVoluntariado', headerName: 'Data Entrada', width: 150 },
    { field: 'dataFimVoluntariado', headerName: 'Data Saída', width: 150 },
    { field: 'totalOficinas', headerName: 'Oficinas', width: 100 },
    { field: 'funcao', headerName: 'Cargo Sistema', width: 150 },
    actionColumn
  ];

  return (
    <>
      <Header />
      <section className={style.Voluntarios}>

        <Datagrid rows={rows} columns={columns} />

        <div className={style.botoes}>
          <Button
            variant="contained"
            color="primary"
            className={style.botaoPresenca}
            onClick={() => navigate('/voluntario')}
          >
            Adicionar Voluntário
          </Button>
        </div>

      </section>
    </>
  );
};

export default Voluntarios;