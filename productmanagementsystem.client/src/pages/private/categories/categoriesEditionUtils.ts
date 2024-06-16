import {
  CreateCategoryRequest,
  CreateOrUpdateCategoryFormData,
  ICategoryDTO,
  UpdateCategoryRequest,
} from '../../../models/entities/category';

export const getDefaultFormData = (productObj?: ICategoryDTO): CreateOrUpdateCategoryFormData => {
  if (productObj) {
    return {
      nameEn: productObj.nameEn,
      nameAr: productObj.nameAr,
    };
  } else {
    return {
      nameEn: '',
      nameAr: '',
    };
  }
};

export const mapFormDataToCreateRequestData = (data: CreateOrUpdateCategoryFormData): CreateCategoryRequest => {
  return {
    nameEn: data.nameEn,
    nameAr: data.nameAr,
  };
};

export const mapFormDataToUpdateRequestData = (
  categoryId: string,
  data: CreateOrUpdateCategoryFormData,
): UpdateCategoryRequest => {
  return {
    categoryId: categoryId,
    nameEn: data.nameEn,
    nameAr: data.nameAr,
  };
};
