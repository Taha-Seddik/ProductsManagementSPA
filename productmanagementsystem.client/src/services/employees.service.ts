import axios, { AxiosResponse } from 'axios';
import { CreateEmployeeRequest, IEmployee, UpdateEmployeeRequest } from '../models/entities/employee';

// const baseUrl = process.env.BASE_URL;
const apiUrl = `/api/employees`;

// returns them sorted by creation date DESC
export const getAllEmployees = (): Promise<AxiosResponse<{ employees: IEmployee[] }>> => {
  const url = `${apiUrl}`;
  const config = {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
  return axios.get(url, config);
};

export const getEmployeeById = (employeeId: number): Promise<AxiosResponse<{ employee: IEmployee }>> => {
  const url = `${apiUrl}/${employeeId}`;
  const config = {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
  return axios.get(url, config);
};

// returns employee id
export const createEmployee = (data: CreateEmployeeRequest): Promise<AxiosResponse<number>> => {
  const url = `${apiUrl}`;
  const config = {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
  return axios.post(url, data, config);
};

export const updateEmployee = (data: UpdateEmployeeRequest): Promise<AxiosResponse<void>> => {
  const url = `${apiUrl}`;
  const config = {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
  return axios.put(url, data, config);
};

export const deleteEmployee = (employeeId: number): Promise<AxiosResponse<void>> => {
  const url = `${apiUrl}/${employeeId}`;
  const config = {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
  return axios.delete(url, config);
};
