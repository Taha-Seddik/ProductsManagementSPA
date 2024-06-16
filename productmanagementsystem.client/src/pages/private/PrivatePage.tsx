import { Outlet } from 'react-router-dom';
import { AdminPageLayout } from '../../layout/main';
import CssBaseline from '@mui/material/CssBaseline';

const PrivatePage: React.FC<{}> = () => {
  return (
    <>
      <CssBaseline />
      <AdminPageLayout>
        <Outlet />
      </AdminPageLayout>
    </>
  );
};

export default PrivatePage;
