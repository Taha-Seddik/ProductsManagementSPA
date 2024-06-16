import { useState } from 'react';
import { AdminSideNavPanel } from './adminSideNav';
import { AdminMainSide } from './adminMainSide';
import Box from '@mui/material/Box';
import { BottomLeftImg, TopRightImg } from './layout.styles';

export const AdminPageLayout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [openNav, setOpenNav] = useState(true);

  const toggleDrawer = () => {
    setOpenNav(!openNav);
  };

  const handleDrawerClose = () => {
    setOpenNav(false);
  };

  return (
    <Box display='flex' position='relative' width='100%' height='100%' overflow='hidden'>
      <PageDecoration />
      <AdminSideNavPanel open={openNav} handleDrawerClose={handleDrawerClose} />
      <AdminMainSide openNav={openNav} toggleDrawer={toggleDrawer}>
        {children}
      </AdminMainSide>
    </Box>
  );
};

const PageDecoration: React.FC = () => {
  return (
    <>
      <TopRightImg src='/images/topRight.svg' alt='' />
      <BottomLeftImg src='/images/bottomLeft.svg' alt='' />
    </>
  );
};
