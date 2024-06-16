import { GridColDef, GridValueFormatterParams } from '@mui/x-data-grid/models';
import { useCallback, useEffect, useState } from 'react';
import { formattedNiceDate } from '../../utils/dates.utils';
import { ActionsRendrer } from './renderers/actionsCell';
import { Departments } from '../../models/entities/employee';

export const usePrepareEmployeesTableColumns = (setOpenConfirm: (status: boolean) => void) => {
  const [columns, setColumns] = useState<GridColDef[]>([]);

  useEffect(() => {
    const newColumns = makeCols();
    setColumns(newColumns);
  }, [setColumns]);

  const makeCols = useCallback(() => {
    const columns: GridColDef[] = [
      { field: 'firstName', headerName: 'First Name', width: 150 },
      { field: 'lastName', headerName: 'Last Name', width: 150 },
      { field: 'jobTitle', headerName: 'Job Title', width: 150 },
      {
        field: 'department',
        headerName: 'Departement',
        width: 200,
        valueFormatter: (params: GridValueFormatterParams) => {
          return Departments[params.value];
        },
      },
      {
        field: 'joiningDate',
        headerName: 'Joining Date',
        type: 'date',
        width: 300,
        valueFormatter: (params: GridValueFormatterParams) => {
          const date = new Date(params.value);
          return formattedNiceDate(date);
        },
      },
      {
        field: 'action',
        headerName: 'Actions',
        sortable: false,
        flex: 1,
        renderCell: (props: any) => {
          return <ActionsRendrer {...props} setOpenConfirm={setOpenConfirm} />;
        },
      },
    ];
    return columns;
  }, [setOpenConfirm]);

  return {
    columns,
  };
};

// {
//   field: 'price',
//   headerName: 'Prix',
//   type: 'number',
//   width: 150,
//   valueFormatter: (params: GridValueFormatterParams) => `${params.value} DT`,
// },
