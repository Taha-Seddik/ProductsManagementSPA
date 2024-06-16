import { ListingUpperBar } from '../../../components/common/ListingUpperBar';
import { useEmployeesData } from '../../../components/employeesList/useEmployeesData';
import { usePrepareEmployeesTableColumns } from '../../../components/employeesList/useTableConfig';
import { RoutesMap } from '../../../routing/RoutesMap';
import Box from '@mui/material/Box';
import { IEmployee } from '../../../models/entities/employee';
import ConfirmDialog from '../../../components/common/confirmDialog';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { useState } from 'react';
import { PageContentContainer } from '../../../styles/base.styles';
import { deleteEmployee } from '../../../services/employees.service';
import { Notify } from '../../../services/toast.service';

const EmployeesPage: React.FC<{}> = () => {
  const { searchText, employeesToShow, fetchRows, handleNewSearch, clearSearchTxt } = useEmployeesData();
  return (
    <PageContentContainer className='fullySizedFlexColumn' elevation={3}>
      <ListingUpperBar
        title='Employees'
        topic='Employee'
        searchPlaceholder='Search by firstName lastName or jobTitle'
        toPath={RoutesMap.createEmployee.path}
        searchText={searchText}
        handleNewSearch={handleNewSearch}
        clearSearchTxt={clearSearchTxt}
      />
      <Box flexGrow={1} mt={2}>
        <EmployeesTable employees={employeesToShow} fetchRows={fetchRows} />
      </Box>
    </PageContentContainer>
  );
};

type ITableProps = {
  employees: IEmployee[];
  fetchRows: () => Promise<void>;
};

const EmployeesTable: React.FC<ITableProps> = ({ employees, fetchRows }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRowsIds, setSelectedRowIds] = useState<string[]>([]);

  const { columns } = usePrepareEmployeesTableColumns(setOpenConfirm);

  const confirmDeleteProduct = async () => {
    const chosenEmployeeId = selectedRowsIds?.[0];
    if (!chosenEmployeeId) return;
    try {
      await deleteEmployee(Number(chosenEmployeeId));
      Notify('Produit supprimé avec succés', 'SUCCESS');
      fetchRows();
    } catch (err: any) {
      const errorInfo = err?.response?.data?.errors?.[0].Message;
      Notify(errorInfo, 'Error');
    }
  };

  return (
    <Box display='flex' flexDirection='column' className='fullHW'>
      <DataGrid
        columns={columns}
        rows={employees}
        onRowSelectionModelChange={(rows) => setSelectedRowIds(rows as string[])}
        rowSelectionModel={selectedRowsIds}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
      <ConfirmDialog
        open={openConfirm}
        title='Sure you wanna delete this employee ?'
        onConfirm={() => confirmDeleteProduct()}
        setOpen={setOpenConfirm}
      />
    </Box>
  );
};

// rowHeight={80}

export default EmployeesPage;
