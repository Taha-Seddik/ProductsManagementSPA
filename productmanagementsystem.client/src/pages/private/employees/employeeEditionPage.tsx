import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { RoutesMap } from '../../../routing/RoutesMap';
import { PageContentContainer } from '../../../styles/base.styles';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { DatePickerElement, FormContainer, SelectElement, TextFieldElement, useForm } from 'react-hook-form-mui';
import { CreateOrUpdateEmployeeFormData, Departments, IEmployee } from '../../../models/entities/employee';
import {
  departmentOptions,
  getDefaultFormData,
  mapFormDataToCreateRequestData,
  mapFormDataToUpdateRequestData,
  useFetchNeededDataForUpdate,
} from './employeeEditionUtils';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { createEmployee, updateEmployee } from '../../../services/employees.service';
import { Notify } from '../../../services/toast.service';

const topic = 'employee';
const titleForCreate = () => `Create new ${topic}`;
const titleForUpdate = (emp: IEmployee | null) => `Update ${topic} ${emp?.firstName} ${emp?.lastName}`;

const EmployeeEditionPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const formDetails = useForm<CreateOrUpdateEmployeeFormData>({ defaultValues: getDefaultFormData() });
  const [showPassword, setShowPassword] = useState(false);
  const { employeeId } = useParams();
  const { foundEmp } = useFetchNeededDataForUpdate();
  const isCreationMode = !Boolean(employeeId);

  // edit mode: set form defaults
  useEffect(() => {
    if (foundEmp) {
      const builtData = getDefaultFormData(foundEmp);
      formDetails.reset(builtData);
    }
  }, [foundEmp]);

  const handleSubmit = async (data: CreateOrUpdateEmployeeFormData) => {
    try {
      if (isCreationMode) {
        await createEmployee(mapFormDataToCreateRequestData(data));
        Notify('Employee created successfully!', 'SUCCESS');
      } else {
        await updateEmployee(mapFormDataToUpdateRequestData(Number(employeeId), data));
        Notify('Employee updated successfully!', 'SUCCESS');
      }

      navigate(RoutesMap.employees.path);
    } catch (err: any) {
      const errorInfo = err?.response?.data?.errors?.[0]?.Message;
      Notify(errorInfo, 'Error');
    }
  };

  return (
    <PageContentContainer className='fullySizedFlexColumn' elevation={0}>
      {/* Navigation side */}
      <Box className='flexStartCenterRow'>
        <NavLink to={RoutesMap.employees.path}>
          <Fab color='primary' size='small' sx={{ mr: 2 }}>
            <KeyboardReturnIcon />
          </Fab>
        </NavLink>
        <Typography variant='h6'>{isCreationMode ? titleForCreate() : titleForUpdate(foundEmp)}</Typography>
      </Box>

      {/* Form  */}
      <FormContainer
        formContext={formDetails}
        onSuccess={handleSubmit}
        FormProps={{ className: 'flexColumn formStyle' }}>
        <Divider textAlign='center' sx={{ my: 2 }}>
          Basic details
        </Divider>
        {/* Email */}
        {isCreationMode && (
          <TextFieldElement
            type='email'
            name='email'
            label='Email'
            required
            fullWidth
            margin='normal'
            autoComplete='employee-email'
          />
        )}
        <Grid container columnSpacing={{ xs: 0, md: 2 }}>
          {/* Firstname */}
          <Grid item md={6} xs={12}>
            <TextFieldElement type='text' name='firstName' label='Firstname' required fullWidth margin='normal' />
          </Grid>
          {/* Lastname */}
          <Grid item md={6} xs={12}>
            <TextFieldElement type='text' name='lastName' label='Lastname' required fullWidth margin='normal' />
          </Grid>
        </Grid>
        {/* Password */}
        {isCreationMode && (
          <TextFieldElement
            type={showPassword ? 'text' : 'password'}
            name='password'
            label='Password'
            required
            fullWidth
            autoComplete='employee-password'
            margin='normal'
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setShowPassword(!showPassword)}
                  edge='end'
                  size='large'>
                  {showPassword ? <VisibilityOffOutlined fontSize='small' /> : <VisibilityOutlined fontSize='small' />}
                </IconButton>
              ),
            }}
          />
        )}

        <Divider textAlign='center' sx={{ my: 2 }}>
          Employement details
        </Divider>
        {/* JobTitle */}
        <TextFieldElement type='text' name='jobTitle' label='Job title' required fullWidth margin='normal' />
        {/* Department */}
        <SelectElement
          label='Department'
          name='department'
          defaultValue={Departments.Development}
          options={departmentOptions}
          required
          fullWidth
          margin='normal'
        />
        {/* JoiningDate */}
        <DatePickerElement
          name='joiningDate'
          label='Joining Date'
          required
          inputProps={{ margin: 'normal' }}
          slotProps={{ inputAdornment: { position: 'start', sx: { pl: 1 } } }}
        />

        <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
          {isCreationMode ? 'Create' : 'Update'}
        </Button>
      </FormContainer>
    </PageContentContainer>
  );
};

export default EmployeeEditionPage;
