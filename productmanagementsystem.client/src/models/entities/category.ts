import { IProductDTO } from './product';

export interface ICategoryDTO {
  id: string;
  nameEn: string;
  nameAr: string;
  products: IProductDTO[];
}

export interface CreateOrUpdateCategoryFormData {
  nameEn: string;
  nameAr: string;
}

export interface CreateCategoryRequest {
  nameEn: string;
  nameAr: string;
}

export interface UpdateCategoryRequest {
  id: string;
  nameEn: string;
  nameAr: string;
}
