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
      isbn: productObj.isbn,
      categoryId: productObj.categoryId,
    };
  } else {
    return {
      name: '',
      price: '',
      isbn: '',
      categoryId: '',
    };
  }
};

export const mapFormDataToCreateRequestData = (data: CreateOrUpdateProductFormData): CreateProductRequest => {
  return {
    name: data.name,
    price: Number(data.price),
    isbn: data.isbn,
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
    isbn: data.isbn,
    categoryId: data.categoryId,
  };
};
