import { useEffect, useMemo } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { RoutesMap } from '../../../routing/RoutesMap';
import { PageContentContainer } from '../../../styles/base.styles';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui';
import {
  getDefaultFormData,
  mapFormDataToCreateRequestData,
  mapFormDataToUpdateRequestData,
} from './categoriesEditionUtils';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Notify } from '../../../services/toast.service';
import { useFetchNeededDataForUpdate } from '../../../hooks/useCategoriesData';
import { CreateOrUpdateCategoryFormData, ICategoryDTO } from '../../../models/entities/category';
import { createCategory, updateCategory } from '../../../services/categories.service';

const topic = 'cateogry';
const titleForCreate = () => `Create new ${topic}`;
const titleForUpdate = (x: ICategoryDTO | null) => `Update ${topic} : ${x?.nameEn}`;

const CategoryEditionPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const formDetails = useForm<CreateOrUpdateCategoryFormData>({
    defaultValues: getDefaultFormData(),
  });
  const { categoryId } = useParams();
  const { categoryObj } = useFetchNeededDataForUpdate();
  const isCreationMode = !Boolean(categoryId);
  const title = useMemo(() => (isCreationMode ? titleForCreate() : titleForUpdate(categoryObj)), [categoryObj]);

  // edit mode: set form defaults
  useEffect(() => {
    if (categoryObj) {
      const builtData = getDefaultFormData(categoryObj);
      formDetails.reset(builtData);
    }
  }, [categoryObj]);

  const handleSubmit = async (data: CreateOrUpdateCategoryFormData) => {
    try {
      if (isCreationMode) {
        await createCategory(mapFormDataToCreateRequestData(data));
        Notify('Category created successfully!', 'SUCCESS');
      } else {
        await updateCategory(mapFormDataToUpdateRequestData(categoryId!, data));
        Notify('Category updated successfully!', 'SUCCESS');
      }

      navigate(RoutesMap.categories.path);
    } catch (err: any) {
      const errorInfo = err?.response?.data?.errors?.[0]?.Message;
      Notify(errorInfo, 'Error');
    }
  };

  return (
    <PageContentContainer className='fullySizedFlexColumn' elevation={0}>
      {/* Navigation side */}
      <Box className='flexStartCenterRow'>
        <NavLink to={RoutesMap.categories.path}>
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
        {/* NameEn */}
        <TextFieldElement type='string' name='nameEn' label='Name' required fullWidth margin='normal' />
        {/* ISBN */}
        <TextFieldElement type='string' name='nameAr' label='Arabic Name' required fullWidth margin='normal' />

        <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
          {isCreationMode ? 'Create' : 'Update'}
        </Button>
      </FormContainer>
    </PageContentContainer>
  );
};

export default CategoryEditionPage;
