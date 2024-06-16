import {
  CreateOrUpdateProductFormData,
  CreateProductRequest,
  IProductDTO,
  UpdateProductRequest,
} from '../../../models/entities/product';

export const getDefaultFormData = (productObj?: IProductDTO): CreateOrUpdateProductFormData => {
  if (productObj) {
    return {
      name: productObj.name,
      price: productObj.price.toString(),
      ISBN: productObj.iSBN,
      categoryId: productObj.categoryId,
    };
  } else {
    return {
      name: '',
      price: '',
      ISBN: '',
      categoryId: '',
    };
  }
};

export const mapFormDataToCreateRequestData = (data: CreateOrUpdateProductFormData): CreateProductRequest => {
  return {
    name: data.name,
    price: Number(data.price),
    iSBN: data.ISBN,
    categoryId: data.categoryId,
  };
};

export const mapFormDataToUpdateRequestData = (
  productId: string,
  data: CreateOrUpdateProductFormData,
): UpdateProductRequest => {
  return {
    id: productId,
    name: data.name,
    price: Number(data.price),
    iSBN: data.ISBN,
    categoryId: data.categoryId,
  };
};
