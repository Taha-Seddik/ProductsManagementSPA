import { ICategoryDTO } from "./category";

export interface IProductDTO {
  id: string;
  name: string;
  price: number;
  iSBN: string;
  userId: string;
  categoryId: string;
  category: ICategoryDTO;
}

export interface CreateProductRequest {}

export interface UpdateProductRequest {}
