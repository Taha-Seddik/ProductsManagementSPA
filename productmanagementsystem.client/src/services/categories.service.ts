import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CreateCategoryRequest, ICategoryDTO, UpdateCategoryRequest } from '../models/entities/category';

const apiUrl = `/api/categories`;
const headers: AxiosRequestConfig['headers'] = {
  'Content-Type': 'application/json; charset=UTF-8',
};

export const getAllCategories = (): Promise<AxiosResponse<{ categories: ICategoryDTO[] }>> => {
  const url = `${apiUrl}`;
  return axios.get(url, { headers: headers });
};

export const getCategoryById = (cId: string): Promise<AxiosResponse<{ category: ICategoryDTO }>> => {
  const url = `${apiUrl}/${cId}`;
  return axios.get(url, { headers: headers });
};

// returns categ id
export const createCategory = (data: CreateCategoryRequest): Promise<AxiosResponse<string>> => {
  const url = `${apiUrl}`;
  return axios.post(url, data, { headers: headers });
};

export const updateCategory = (data: UpdateCategoryRequest): Promise<AxiosResponse<void>> => {
  const url = `${apiUrl}`;
  return axios.put(url, data, { headers: headers });
};

export const deleteCategory = (cId: string): Promise<AxiosResponse<void>> => {
  const url = `${apiUrl}/${cId}`;
  return axios.delete(url, { headers: headers });
};
