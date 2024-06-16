import { MainSideContainer } from './layout.styles';
import { MainSideTopBarRoot } from './adminMainSideTopBar';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

type IProps = {
  openNav: boolean;
  toggleDrawer: () => void;
  children: React.ReactElement;
};

const MainSideContent = styled(Paper)(({ theme }) => ({
  flexGrow: 1,
  margin: theme.spacing(2, 4),
  overflow: 'hidden',
}));

export const AdminMainSide: React.FC<IProps> = ({ toggleDrawer, children }) => {
  return (
    <MainSideContainer elevation={12}>
      {/* Top bar  */}
      <MainSideTopBarRoot toggleDrawer={toggleDrawer} />
      <MainSideContent>{children}</MainSideContent>
    </MainSideContainer>
  );
};
