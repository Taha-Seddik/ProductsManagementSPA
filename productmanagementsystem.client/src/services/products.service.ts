import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  CreateProductRequest,
  IProductDTO,
  UpdateProductRequest,
} from "../models/entities/product";

const apiUrl = `/api/products`;
const headers: AxiosRequestConfig["headers"] = {
  "Content-Type": "application/json; charset=UTF-8",
};

export const getAllProducts = (): Promise<AxiosResponse<IProductDTO[]>> => {
  const url = `${apiUrl}`;
  return axios.get(url, { headers: headers });
};

export const getProductById = (
  pId: number
): Promise<AxiosResponse<IProductDTO>> => {
  const url = `${apiUrl}/${pId}`;
  return axios.get(url, { headers: headers });
};

// returns product id
export const createProduct = (
  data: CreateProductRequest
): Promise<AxiosResponse<string>> => {
  const url = `${apiUrl}`;
  return axios.post(url, data, { headers: headers });
};

export const updateProduct = (
  data: UpdateProductRequest
): Promise<AxiosResponse<void>> => {
  const url = `${apiUrl}`;
  return axios.put(url, data, { headers: headers });
};

export const deleteProduct = (pId: string): Promise<AxiosResponse<void>> => {
  const url = `${apiUrl}/${pId}`;
  return axios.delete(url, { headers: headers });
};
