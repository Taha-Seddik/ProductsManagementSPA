import { GridColDef } from '@mui/x-data-grid/models';
import { useCallback, useEffect, useState } from 'react';
import { ActionsRendrer } from './renderers/actionsCell';

export const usePrepareProductsTableColumns = (setOpenConfirm: (status: boolean) => void) => {
  const [columns, setColumns] = useState<GridColDef[]>([]);

  useEffect(() => {
    const newColumns = makeCols();
    setColumns(newColumns);
  }, [setColumns]);

  const makeCols = useCallback(() => {
    const columns: GridColDef[] = [
      { field: 'name', headerName: 'Name', width: 250 },
      { field: 'price', headerName: 'Price', width: 350 },
      { field: 'isbn', headerName: 'ISBN', width: 450 },
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
