import { IProductDTO } from "./product";

export interface ICategoryDTO {
  id: string;
  nameEn: string;
  nameAr: string;
  products: IProductDTO[];
}
