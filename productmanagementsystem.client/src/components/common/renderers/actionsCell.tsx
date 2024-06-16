import { GridRowParams } from '@mui/x-data-grid';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { makeEditRoute } from '../../../routing/RoutesMap';
import { IProductDTO } from '../../../models/entities/product';

interface AdditionalProps {
  setOpenConfirm: (status: boolean) => void;
  editOn: 'ProductPage' | 'CategoryPage';
}

export const ActionsRendrer = ({ row, editOn, setOpenConfirm }: Partial<GridRowParams> & AdditionalProps) => {
  const pObj = row as IProductDTO;

  const startDelete = () => {
    setOpenConfirm(true);
  };

  return (
    <Box display='flex' justifyContent='center' width='100%'>
      <Tooltip title='Edit employee'>
        <NavLink to={makeEditRoute(pObj.id, editOn)}>
          <IconButton size='small' color='default' aria-label='edit'>
            <Edit />
          </IconButton>
        </NavLink>
      </Tooltip>
      <Tooltip title='Delete employee'>
        <IconButton size='small' color='default' aria-label='delete' onClick={startDelete}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
