import style from './Oficinas.module.css';
import Datagrid from '../../components/DataGrid';
//import NomePags from '../../components/NomePags';
import Header from '../../components/Header';
//import ButtonLink from '../../components/ButtonLink'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClassIcon from '@mui/icons-material/Class';
import { IconButton, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getVoluntario } from '../../Services/voluntariosService.js';
import { deletarOficina } from '../../Services/oficinasService.js';

function Oficinas() {

  const navigate = useNavigate();
  const [voluntario, setVoluntario] = useState(null);
  const [error, setError] = useState("");



  const { id } = useParams();

  useEffect(() => {
    const carregarOficinas = async () => {
      if (!id) return;
      try {
        const response = await getVoluntario(id);
        // service returns an object with { voluntario }
        const vol = response.voluntario || response;
        setVoluntario(vol);
      } catch (err) {
        setError(err.message || 'Erro ao carregar oficinas');
      }
    };

    carregarOficinas();
  }, [id]);

  const handleDelete = async (oficinaId) => {
    const confirm = window.confirm('Confirma exclusão dessa oficina?');
    if (!confirm) return;

    try {
      await deletarOficina(id, oficinaId);
      // Recarrega o voluntário para atualizar a lista de oficinas
      const response = await getVoluntario(id);
      const vol = response.voluntario || response;
      setVoluntario(vol);
    } catch (err) {
      console.error('Erro ao deletar oficina:', err);
      setError(err.message || 'Erro ao deletar oficina');
    }
  };



  const actionColumn = {
    field: 'actions',
    headerName: 'Ações',
    width: 250,
    sortable: false,
    renderCell: (params) => (
      <div className={style.actionButtons}>

        <IconButton
          //Ajustar a parte de editar
          //onClick={() => navigate(`/voluntarios/${params.row.id}/editar`)}
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
    ),
  };

  const rows = (voluntario?.oficinas || []).map((oficina, index) => ({
    id: oficina._id || index,
    nome: oficina.nome,
    dataInicio: oficina.dataInicio ? new Date(oficina.dataInicio).toLocaleDateString('pt-BR') : '--',
    dataFim: oficina.dataFim ? new Date(oficina.dataFim).toLocaleDateString('pt-BR') : '--',
    funcao: oficina.funcao,
  }));

  const columns = [
    { field: 'nome', headerName: 'Nome da Oficina', width: 300 },
    { field: 'dataInicio', headerName: 'Data Início', width: 150 },
    { field: 'dataFim', headerName: 'Data Fim', width: 150 },
    { field: 'funcao', headerName: 'Cargo do Voluntário', width: 150 },
    actionColumn,
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
            onClick={() => navigate('/voluntarios/novo')}
          >
            Adicionar Oficina
          </Button>
        </div>

      </section>
    </>
  );
};

export default Oficinas;