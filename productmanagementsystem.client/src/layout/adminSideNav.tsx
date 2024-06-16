import { useSideNavState } from '../hooks/useSideNavState';
import { adminSideNavItems } from '../routing/adminNavItems';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { ISideNavItem, ISideNavSubItem } from '../models/sideNavTypes';
import Collapse from '@mui/material/Collapse';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Icon } from '@mui/material';
import { matchPath } from 'react-router-dom';
import { DrawerHeader, SideNavDrawer } from './layout.styles';

type IProps = {
  open: boolean;
  handleDrawerClose: () => void;
};

export const AdminSideNavPanel: React.FC<IProps> = ({ open }) => {
  const { navItems, handleItemClick, handleSubItemClick } = useSideNavState(adminSideNavItems);
  const navKeys = Object.keys(navItems);
  return (
    <SideNavDrawer open={open} variant='persistent' anchor='left'>
      <div className='sideNavContent'>
        <SideNavHeadSide />
        {/* <CustomDivider /> */}
        {navKeys.map((itemKey) => (
          <List key={itemKey} disablePadding dense>
            {/* Item */}
            <NavLinkItem itemKey={itemKey} item={navItems[itemKey]} handleItemClick={handleItemClick} />
            {/* subItems */}
            <NavLinkItemSubs itemKey={itemKey} item={navItems[itemKey]} handleSubItemClick={handleSubItemClick} />
          </List>
        ))}
      </div>
    </SideNavDrawer>
  );
};

const SideNavHeadSide: React.FC<{}> = () => {
  //   const userData = useUserData();
  //   if (!userData) return <Box sx={{ height: 130 }}></Box>;
  return (
    <DrawerHeader className='flexCenterRow' sx={{ height: 130 }}>
      <div className='toolbar flexCenterCenterColumn'>
        {/* <Avatar src='/images/adminPic.png' sx={{ mb: 1 }}></Avatar> */}
        <img src='/images/dark-logo-01.png' alt='app logo' width='150' />
      </div>
    </DrawerHeader>
  );
};
type ItemclickType = (event: any, itemKey: string) => void;

const NavLinkItem: React.FC<{ itemKey: string; item: ISideNavItem; handleItemClick: ItemclickType }> = ({
  item,
  itemKey,
  handleItemClick,
}) => {
  const isItemActive = !!matchPath(location.pathname, item.route!);
  return (
    <ListItem onClick={(e) => handleItemClick(e, itemKey)}>
      <ListItemButton className='navItem' selected={isItemActive}>
        <ListItemIcon>
          <Icon>{item.icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={item.label} sx={{ fontWeight: 500 }} primaryTypographyProps={{ fontWeight: 500 }} />
        {item.items.length ? item.open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>
    </ListItem>
  );
};

type SubItemclickType = (event: any, itemKey: string, subItemIndex: number) => void;

const NavLinkItemSubs: React.FC<{ itemKey: string; item: ISideNavItem; handleSubItemClick: SubItemclickType }> = ({
  itemKey,
  item,
  handleSubItemClick,
}) => {
  return (
    <>
      {item.items?.map((subItem, subIndex) => (
        <Collapse key={itemKey + subIndex} in={item.open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <NavSubItem
              itemKey={itemKey}
              subIndex={subIndex}
              subItem={subItem}
              handleSubItemClick={handleSubItemClick}
            />
          </List>
        </Collapse>
      ))}
    </>
  );
};

const NavSubItem: React.FC<{
  itemKey: string;
  subIndex: number;
  subItem: ISideNavSubItem;
  handleSubItemClick: SubItemclickType;
}> = ({ subItem, itemKey, handleSubItemClick, subIndex }) => {
  return (
    <ListItem onClick={(e) => handleSubItemClick(e, itemKey, subIndex)} sx={{ pt: 0, pb: 0, pl: 4 }}>
      <ListItemButton>
        <Typography variant='caption' mr={1}>
          -
        </Typography>
        <ListItemText primary={subItem.label} primaryTypographyProps={{ fontWeight: 500, variant: 'subtitle2' }} />
      </ListItemButton>
    </ListItem>
  );
};
