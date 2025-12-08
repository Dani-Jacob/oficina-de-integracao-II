import style from './Certificados.module.css';
import Datagrid from '../../components/DataGrid';
import Header from '../../components/Header';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCertificados, deletarCertificado } from '../../Services/certificadosService.js';

function Certificados() {

  const navigate = useNavigate();
  const [certificados, setCertificados] = useState([]);
  const [error, setError] = useState("");



  const { id } = useParams();

  useEffect(() => {
    const carregarCertificados = async () => {
      if (!id) return;
      try {
        const response = await getCertificados(id);
        setCertificados(response || []);
      } catch (err) {
        setError(err.message || 'Erro ao carregar certificados');
      }
    };

    carregarCertificados();
  }, [id]);

  const handleDelete = async (certificadoId) => {
    const confirm = window.confirm('Confirma exclusão desse certificado?');
    if (!confirm) return;

    try {
      await deletarCertificado(id, certificadoId);
      setCertificados((prev) => prev.filter((c) => c._id !== certificadoId));
    } catch (err) {
      console.error('Erro ao deletar certificado:', err);
      setError(err.message || 'Erro ao deletar certificado');
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
          onClick={() => navigate(`/Voluntarios/${id}/Certificados/${params.row.id}`)}
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

  const rows = (certificados || []).map((cert, index) => ({
    id: cert._id || index,
    nome: cert.nome || `Certificado ${index + 1}`,
    horas: cert.horas != null ? cert.horas : '--',
  }));

  const columns = [
    { field: 'nome', headerName: 'Nome do Certificado', width: 300 },
    { field: 'horas', headerName: 'Horas', width: 150 },
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
            onClick={() => navigate(`/Voluntarios/${id}/Certificados/Novo`)}
          >
            Adicionar Certificado
          </Button>
        </div>

      </section>
    </>
  );
};

export default Certificados;