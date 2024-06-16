import { ICategoryDTO } from './category';

export interface IProductDTO {
  id: string;
  name: string;
  price: number;
  iSBN: string;
  userId: string;
  categoryId: string;
  category: ICategoryDTO;
}

export interface CreateOrUpdateProductFormData {
  name: string;
  price: string;
  ISBN: string;
  categoryId: string;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  iSBN: string;
  categoryId: string;
}

export interface UpdateProductRequest {
  id: string;
  name: string;
  price: number;
  iSBN: string;
  categoryId: string;
}
