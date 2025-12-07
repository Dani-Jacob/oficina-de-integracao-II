import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import style from './DataGrid.module.css';
import { useState } from 'react';

function Datagrid({ rows, columns, toolbar = GridToolbar, className, ...props }) {

  const [selectedRow, setSelectedRow] = useState(null);

  const localeText = {
    toolbarDensity: 'Densidade',
    toolbarDensityLabel: 'Densidade',
    toolbarDensityCompact: 'Compacto',
    toolbarDensityStandard: 'Padrão',
    toolbarDensityComfortable: 'Confortável',

    toolbarExport: 'Exportar',
    toolbarExportLabel: 'Exportar',
    toolbarExportCSV: 'Baixar como CSV',
    toolbarExportPrint: 'Imprimir',

    toolbarFilters: 'Filtros',
    toolbarFiltersLabel: 'Mostrar Filtros',
    toolbarFiltersTooltipHide: 'Esconder Filtros',
    toolbarFiltersTooltipShow: 'Mostrar Filtros',

    toolbarColumns: 'Colunas',
    toolbarColumnsLabel: 'Selecionar Colunas',

    // Você pode adicionar mais traduções conforme necessário
  };

  const handleRowClick = (params) => {
    if (selectedRow === params.id) {
      setSelectedRow(null);
    } else {
      console.log('item selecionado ' + params.row.nome)
      setSelectedRow(params.id);
    }
  };

  const handleRowSelectionChange = (newSelectionModel) => {
    setSelectedRow(newSelectionModel.length > 0 ? newSelectionModel[0] : null);
  };

  return (
    <div className={`${style.container} ${className}`}>
      <DataGrid
        className={style.datagrid}
        rows={rows || []}
        columns={columns.map((column) => ({
          ...column,
          headerAlign: 'center',
          align: 'center',
        }))}
        pageSizeOptions={[5, 10, 25, 50]}
        paginationModel={{ pageSize: 10, page: 0 }}
        onPaginationModelChange={() => {}}
        checkboxSelection={false}
        slots={{
          toolbar: toolbar,
        }}
        slotProps={{
          toolbar: {
            printOptions: { disableToolbarButton: true },
            csvOptions: { 
              allColumns: true,
              allRows: true
            }
          }
        }}
        onRowClick={handleRowClick}
        {...props}
      />
    </div>
  );
}

export default Datagrid;