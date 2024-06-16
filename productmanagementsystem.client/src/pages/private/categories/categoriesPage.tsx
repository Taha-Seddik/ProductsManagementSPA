import { ListingUpperBar } from '../../../components/common/ListingUpperBar';
import { usePrepareCategoriesTableColumns } from '../../../hooks/useTableConfig';
import { RoutesMap } from '../../../routing/RoutesMap';
import Box from '@mui/material/Box';
import ConfirmDialog from '../../../components/common/confirmDialog';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { useState } from 'react';
import { PageContentContainer } from '../../../styles/base.styles';
import { Notify } from '../../../services/toast.service';
import { useCategoriesData } from '../../../hooks/useCategoriesData';
import { ICategoryDTO } from '../../../models/entities/category';
import { deleteCategory } from '../../../services/categories.service';

const CategoriesPage: React.FC<{}> = () => {
  const { searchText, categoriesToShow, fetchRows, handleNewSearch, clearSearchTxt } = useCategoriesData();

  return (
    <PageContentContainer className='fullySizedFlexColumn' elevation={3}>
      <ListingUpperBar
        title='Categories'
        topic='Category'
        searchPlaceholder='Search by nameAr or nameEn'
        toPath={RoutesMap.createCategory.path}
        searchText={searchText}
        handleNewSearch={handleNewSearch}
        clearSearchTxt={clearSearchTxt}
      />
      <Box flexGrow={1} mt={2}>
        <CategoriesTable categories={categoriesToShow} fetchRows={fetchRows} />
      </Box>
    </PageContentContainer>
  );
};

type ITableProps = {
  categories: ICategoryDTO[];
  fetchRows: () => Promise<void>;
};

const dataGridSlotConf = {
  toolbar: {
    showQuickFilter: true,
    quickFilterProps: { debounceMs: 500 },
  },
};

const CategoriesTable: React.FC<ITableProps> = ({ categories, fetchRows }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRowsIds, setSelectedRowIds] = useState<string[]>([]);
  const { columns } = usePrepareCategoriesTableColumns(setOpenConfirm);

  const confirmDeleteCategory = async () => {
    const chosenId = selectedRowsIds?.[0];
    if (!chosenId) return;
    try {
      await deleteCategory(chosenId);
      Notify('Product successfully deleted', 'SUCCESS');
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
        rows={categories}
        onRowSelectionModelChange={(rows) => setSelectedRowIds(rows as string[])}
        rowSelectionModel={selectedRowsIds}
        slotProps={dataGridSlotConf}
      />
      <ConfirmDialog
        open={openConfirm}
        title='Sure you wanna delete this category ?'
        onConfirm={() => confirmDeleteCategory()}
        setOpen={setOpenConfirm}
      />
    </Box>
  );
};

export default CategoriesPage;
