import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { SignInData } from '../../models/authTypes';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '../../routing/RoutesMap';
import Box from '@mui/material/Box';

const LoginFormContainer = styled('div')(({ theme }) => ({
  width: '60%',
  marginTop: theme.spacing(-2),
}));

const getDefaultFormState = () => ({ email: 'keita@gmail.com', password: '1111' });

export const LoginForm: React.FC<{}> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signInData, setSignInData] = useState<SignInData>(getDefaultFormState());
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormDataChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const inputKey = ev.target.name;
    const inputNewValue = ev.target.value;
    setSignInData((prevState) => {
      return { ...prevState, [inputKey]: inputNewValue };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // go to home page
    navigate(RoutesMap.home.path);
  };

  return (
    <LoginFormContainer>
      <form onSubmit={handleSubmit}>
        <Typography variant='h5' fontWeight={300}>
          Welcome to Vacation Tracker
        </Typography>
        <Typography variant='h4' fontWeight={600}>
          Sign In
        </Typography>
        <Box mt={2}>
          {/* Email */}
          <TextField
            id='email'
            onChange={handleFormDataChange}
            value={signInData.email}
            type='email'
            name='email'
            label='Email'
            margin='dense'
            required
            fullWidth
          />
          {/* Password */}
          <TextField
            id='password'
            onChange={handleFormDataChange}
            value={signInData.password}
            type={showPassword ? 'text' : 'password'}
            name='password'
            label='Mot de passe'
            margin='dense'
            required
            fullWidth
            sx={{ mt: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  edge='end'
                  size='large'>
                  {showPassword ? <VisibilityOffOutlined fontSize='small' /> : <VisibilityOutlined fontSize='small' />}
                </IconButton>
              ),
            }}
          />
        </Box>
        <Button type='submit' variant='contained' fullWidth sx={{ mt: 4 }}>
          Login
        </Button>
      </form>
    </LoginFormContainer>
  );
};
