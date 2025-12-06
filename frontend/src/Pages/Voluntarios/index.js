import style from './Voluntarios.module.css';
import Datagrid from '../../components/DataGrid';
//import NomePags from '../../components/NomePags';
import Header from '../../components/Header';
//import ButtonLink from '../../components/ButtonLink'
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getVoluntarios } from '../../Services/voluntariosService.js';

function Voluntarios() {

  const navigate = useNavigate();
  const [voluntarios, setVoluntarios] = useState([]);
  const [error, setError] = useState("");



  useEffect(() => {
    const carregarVoluntarios  = async () => {

      try {
        const response = await getVoluntarios();
        setVoluntarios(response);
        console.log(response)
      }
      catch (err) {
        setError(err)
      }

    }
    carregarVoluntarios ();
  },
    [])



  const actionColumn = {

    field: 'actions',
    headerName: 'Ações',
    width: 250,
    sortable: false,
    renderCell: (params) => (
      <div className={style.actionButtons}>
        <IconButton
          onClick={() => console.log("ola")}//handleEdit(params.row.id)}
          color="primary"
          size="small"
        >
            <EditIcon/>
        </IconButton>

      </div>
    ),
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
    dataFimVoluntariado: vol.dataFimVoluntariado ? new Date(vol.dataFimVoluntariado).toLocaleDateString('pt-BR') : 'Em andamento',
    totalCertificados: vol.certificados?.length || 0,
    totalOficinas: vol.oficinas?.length || 0,
  }));

  const columns = [
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'cpf', headerName: 'CPF', width: 150 },
    { field: 'funcao', headerName: 'Função', width: 150 },
    { field: 'curso', headerName: 'Curso', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'dataInicioVoluntariado', headerName: 'Data Início', width: 150 },
    { field: 'totalOficinas', headerName: 'Oficinas', width: 100 },
    actionColumn
  ];

  return (
    <>
      <Header />
      <section className={style.Voluntarios}>
        
        <Datagrid rows={rows} columns={columns} />


      </section>
    </>
  );
};

export default Voluntarios;