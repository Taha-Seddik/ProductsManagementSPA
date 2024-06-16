import { ICategoryDTO } from './category';

export interface IProductDTO {
  id: string;
  name: string;
  price: number;
  isbn: string;
  userId: string;
  categoryId: string;
  category: ICategoryDTO;
}

export interface CreateOrUpdateProductFormData {
  name: string;
  price: string;
  isbn: string;
  categoryId: string;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  isbn: string;
  categoryId: string;
}

export interface UpdateProductRequest {
  productId: string;
  name: string;
  price: number;
  isbn: string;
  categoryId: string;
}
