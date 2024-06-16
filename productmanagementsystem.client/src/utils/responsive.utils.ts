import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export const useIsSm = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
};

export const useIsMd = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('lg'));
};

export const useIsLg = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('xl'));
};
