import { useRef, useState } from 'react';
import {
  Avatar,
  Chip,
  ClickAwayListener,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popper,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '../routing/RoutesMap';
import Box from '@mui/material/Box';
import { AccountMenuWrapper, MainSideTopBar } from './layout.styles';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { highestZIndex } from '../utils/constants';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export const MainSideTopBarRoot: React.FC<{ toggleDrawer: () => void }> = ({ toggleDrawer }) => {
  const [accountMenuBtnEL, setAccountMenuBtnEL] = useState<HTMLElement | null>(null);
  const userMenuAnchor = useRef<HTMLElement | null>(null);

  const handleClickOnAccountBtn = () => {
    setAccountMenuBtnEL(userMenuAnchor.current);
  };

  const handleCloseAccountMenu = () => {
    setAccountMenuBtnEL(null);
  };

  return (
    <>
      <MainSideTopBar position='relative' color='transparent' elevation={0} ref={userMenuAnchor}>
        <Box className='innerContent'>
          {/* Icon for toggling full mode  */}
          <IconButton edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }} onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <span className='takeTheRest' />
          <AdminUserMenuButton clickHandler={handleClickOnAccountBtn} isForMobile={false} />
        </Box>
      </MainSideTopBar>
      <AdminAccountMenu anchorEl={accountMenuBtnEL} handleClose={handleCloseAccountMenu} />
    </>
  );
};

type IAdminUserMenuButtonProps = {
  clickHandler: (ev: React.MouseEvent<any>) => void;
  isForMobile: boolean;
};

const AdminUserMenuButton: React.FC<IAdminUserMenuButtonProps> = ({ clickHandler }) => {
  // const userData = useUserData();
  // if (!userData) return null;
  return (
    <Box className='flexCenterRow' color='white' gap={1}>
      <div className='flexEndCenterColumn'>
        <Typography variant='button' textTransform='capitalize'>
          {/* {userData.firstName} {userData.lastName} */}
          Keita touré
        </Typography>
        <Chip size='small' label='Admin' color='secondary' sx={{ color: 'white' }} />
      </div>
      <Fab size='small' color='inherit' onClick={clickHandler}>
        {/* <AdminPanelSettingsIcon fontSize={isForMobile ? 'small' : 'medium'} color='primary' /> */}
        <Avatar src='/images/adminPic.png'></Avatar>
      </Fab>
    </Box>
  );
};

type IAdminAccountMenuProps = { anchorEl: HTMLElement | null; handleClose: () => void };

const AdminAccountMenu: React.FC<IAdminAccountMenuProps> = ({ anchorEl, handleClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(RoutesMap.signIn.path);
  };

  return (
    <Popper anchorEl={anchorEl} open={Boolean(anchorEl)} placement='bottom-end' sx={{ p: 1, zIndex: highestZIndex }}>
      <ClickAwayListener onClickAway={handleClose}>
        <AccountMenuWrapper>
          <Box display='flex' flexDirection='column'>
            {/* Menu items  */}
            <List disablePadding dense>
              {/* Account item  */}
              <ListItem>
                <ListItemButton className='menuItem'>
                  <ListItemIcon>
                    <ManageAccountsIcon />
                  </ListItemIcon>
                  <ListItemText primary='Account' />
                </ListItemButton>
              </ListItem>
              {/* Signout item  */}
              <ListItem>
                <ListItemButton className='menuItem' onClick={handleLogout}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary='SignOut' />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </AccountMenuWrapper>
      </ClickAwayListener>
    </Popper>
  );
};
