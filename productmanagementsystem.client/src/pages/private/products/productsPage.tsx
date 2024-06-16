import { ListingUpperBar } from '../../../components/common/ListingUpperBar';
import { useProductsData } from '../../../hooks/useProductsData';
import { usePrepareProductsTableColumns } from '../../../components/productsList/useTableConfig';
import { RoutesMap } from '../../../routing/RoutesMap';
import Box from '@mui/material/Box';
import ConfirmDialog from '../../../components/common/confirmDialog';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { useState } from 'react';
import { PageContentContainer } from '../../../styles/base.styles';
import { deleteProduct } from '../../../services/products.service';
import { Notify } from '../../../services/toast.service';
import { IProductDTO } from '../../../models/entities/product';
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from '@mui/material';

function getStyles(x: string, selectedIds: string[], theme: Theme) {
  return {
    fontWeight: selectedIds.indexOf(x) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ProductsPage: React.FC<{}> = () => {
  const theme = useTheme();
  const {
    searchText,
    employeesToShow,
    chosenCategoriesIds,
    setChosenCategoriesIds,
    categoriesOptions,
    fetchRows,
    handleNewSearch,
    clearSearchTxt,
  } = useProductsData();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setChosenCategoriesIds(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
              <InputLabel id='demo-multiple-name-label'>Category</InputLabel>
              <Select
                labelId='demo-multiple-name-label'
                id='filterByCategories'
                multiple
                value={chosenCategoriesIds as any}
                onChange={handleChange}
                input={<OutlinedInput label='Name' />}
                MenuProps={MenuProps}>
                {categoriesOptions?.map((x) => (
                  <MenuItem key={x.id} value={x.id} style={getStyles(x.id, chosenCategoriesIds, theme)}>
                    {x.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
      />
      <Box flexGrow={1} mt={2}>
        <ProductsTable products={employeesToShow} fetchRows={fetchRows} />
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
