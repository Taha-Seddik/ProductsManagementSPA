import { useEffect, useMemo } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { RoutesMap } from '../../../routing/RoutesMap';
import { PageContentContainer } from '../../../styles/base.styles';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { FormContainer, SelectElement, TextFieldElement, useForm } from 'react-hook-form-mui';
import {
  getDefaultFormData,
  mapFormDataToCreateRequestData,
  mapFormDataToUpdateRequestData,
} from './productEditionUtils';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { createProduct, updateProduct } from '../../../services/products.service';
import { Notify } from '../../../services/toast.service';
import { useFetchNeededDataForUpdate } from '../../../hooks/useProductsData';
import { CreateOrUpdateProductFormData, IProductDTO } from '../../../models/entities/product';

const topic = 'product';
const titleForCreate = () => `Create new ${topic}`;
const titleForUpdate = (x: IProductDTO | null) => `Update ${topic} : ${x?.name}`;

const ProductEditionPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const formDetails = useForm<CreateOrUpdateProductFormData>({
    defaultValues: getDefaultFormData(),
  });
  const { productId } = useParams();
  const { productObj, categories } = useFetchNeededDataForUpdate();
  const isCreationMode = !Boolean(productId);
  const title = useMemo(() => (isCreationMode ? titleForCreate() : titleForUpdate(productObj)), [productObj]);
  const categoriesOptions = useMemo(() => {
    if (!categories) return [];
    return categories.map((x) => ({ id: x.id, label: x.nameEn }));
  }, [categories]);

  // edit mode: set form defaults
  useEffect(() => {
    if (productObj) {
      const builtData = getDefaultFormData(productObj);
      formDetails.reset(builtData);
    }
  }, [productObj]);

  const handleSubmit = async (data: CreateOrUpdateProductFormData) => {
    try {
      if (isCreationMode) {
        await createProduct(mapFormDataToCreateRequestData(data));
        Notify('Employee created successfully!', 'SUCCESS');
      } else {
        await updateProduct(mapFormDataToUpdateRequestData(productId!, data));
        Notify('Employee updated successfully!', 'SUCCESS');
      }

      navigate(RoutesMap.products.path);
    } catch (err: any) {
      const errorInfo = err?.response?.data?.errors?.[0]?.Message;
      Notify(errorInfo, 'Error');
    }
  };

  return (
    <PageContentContainer className='fullySizedFlexColumn' elevation={0}>
      {/* Navigation side */}
      <Box className='flexStartCenterRow'>
        <NavLink to={RoutesMap.products.path}>
          <Fab color='primary' size='small' sx={{ mr: 2 }}>
            <KeyboardReturnIcon />
          </Fab>
        </NavLink>
        <Typography variant='h6'>{title}</Typography>
      </Box>

      {/* Form  */}
      <FormContainer
        formContext={formDetails}
        onSuccess={handleSubmit}
        FormProps={{ className: 'flexColumn formStyle' }}>
        <Divider textAlign='center' sx={{ my: 2 }}>
          Basic details
        </Divider>
        {/* Name */}
        <TextFieldElement type='string' name='name' label='Name' required fullWidth margin='normal' />
        {/* Price */}
        <TextFieldElement type='number' name='price' label='Price' required fullWidth margin='normal' />
        {/* ISBN */}
        <TextFieldElement type='string' name='isbn' label='ISBN' required fullWidth margin='normal' />
        {/* Category  */}
        <SelectElement
          label='Category'
          name='categoryId'
          options={categoriesOptions}
          required
          fullWidth
          margin='normal'
        />
        <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
          {isCreationMode ? 'Create' : 'Update'}
        </Button>
      </FormContainer>
    </PageContentContainer>
  );
};

export default ProductEditionPage;

/* 

 <Grid container columnSpacing={{ xs: 0, md: 2 }}>
          <Grid item md={6} xs={12}>
            <TextFieldElement type='text' name='firstName' label='Firstname' required fullWidth margin='normal' />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextFieldElement type='text' name='lastName' label='Lastname' required fullWidth margin='normal' />
          </Grid>
        </Grid>
*/
