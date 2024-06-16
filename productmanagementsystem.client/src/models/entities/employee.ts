export interface IEmployee {
  id: number; // identifier
  jobTitle: string;
  department: Departments;
  role: string;
  joiningDate: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export enum Departments {
  Development,
  Design,
  Testing,
  HR,
}

export interface CreateOrUpdateEmployeeFormData {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  jobTitle: string;
  department: Departments;
  joiningDate: Date;
}

export interface CreateEmployeeRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  jobTitle: string;
  department: Departments;
  joiningDate: string;
}

export type UpdateEmployeeRequest = Omit<CreateEmployeeRequest, 'password'> & { employeeId: number };
