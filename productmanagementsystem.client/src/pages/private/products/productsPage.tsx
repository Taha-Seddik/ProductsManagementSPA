import { ListingUpperBar } from '../../../components/common/ListingUpperBar';
import { useProductsData } from '../../../hooks/useProductsData';
import { usePrepareProductsTableColumns } from '../../../hooks/useTableConfig';
import { RoutesMap } from '../../../routing/RoutesMap';
import Box from '@mui/material/Box';
import ConfirmDialog from '../../../components/common/confirmDialog';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { useState } from 'react';
import { PageContentContainer } from '../../../styles/base.styles';
import { deleteProduct } from '../../../services/products.service';
import { Notify } from '../../../services/toast.service';
import { IProductDTO } from '../../../models/entities/product';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const ProductsPage: React.FC<{}> = () => {
  const {
    searchText,
    productsToShow,
    chosenCategoryId,
    categoriesOptions,
    fetchRows,
    handleNewSearch,
    clearSearchTxt,
    doFilterByCategory,
  } = useProductsData();

  return (
    <PageContentContainer className='fullySizedFlexColumn' elevation={3}>
      <ListingUpperBar
        title='Products'
        topic='Product'
        searchPlaceholder='Search by name or ISBN'
        toPath={RoutesMap.createProduct.path}
        searchText={searchText}
        handleNewSearch={handleNewSearch}
        clearSearchTxt={clearSearchTxt}
        additionalFields={() => (
          <Box ml={2} width={350}>
            <FormControl fullWidth size='small'>
              <InputLabel id='demo-simple-select-label'>Category</InputLabel>
              <Select
                labelId='filterByCategroy-label'
                id='filterByCategroy'
                label='Category'
                value={chosenCategoryId}
                onChange={(e) => doFilterByCategory(e.target.value)}>
                {categoriesOptions?.map((x) => (
                  <MenuItem key={x.id} value={x.id}>
                    {x.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
      />
      <Box flexGrow={1} mt={2}>
        <ProductsTable products={productsToShow} fetchRows={fetchRows} />
      </Box>
    </PageContentContainer>
  );
};

type ITableProps = {
  products: IProductDTO[];
  fetchRows: () => Promise<void>;
};

const dataGridSlotConf = {
  toolbar: {
    showQuickFilter: true,
    quickFilterProps: { debounceMs: 500 },
  },
};

const ProductsTable: React.FC<ITableProps> = ({ products, fetchRows }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRowsIds, setSelectedRowIds] = useState<string[]>([]);
  const { columns } = usePrepareProductsTableColumns(setOpenConfirm);

  const confirmDeleteProduct = async () => {
    const chosenPId = selectedRowsIds?.[0];
    if (!chosenPId) return;
    try {
      await deleteProduct(chosenPId);
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
        rows={products}
        onRowSelectionModelChange={(rows) => setSelectedRowIds(rows as string[])}
        rowSelectionModel={selectedRowsIds}
        slotProps={dataGridSlotConf}
      />
      <ConfirmDialog
        open={openConfirm}
        title='Sure you wanna delete this product ?'
        onConfirm={() => confirmDeleteProduct()}
        setOpen={setOpenConfirm}
      />
    </Box>
  );
};

export default ProductsPage;
