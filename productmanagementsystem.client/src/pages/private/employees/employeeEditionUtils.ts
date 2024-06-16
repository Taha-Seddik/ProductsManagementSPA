import { useParams } from 'react-router-dom';
import {
  CreateOrUpdateEmployeeFormData,
  CreateEmployeeRequest,
  Departments,
  IEmployee,
  UpdateEmployeeRequest,
} from '../../../models/entities/employee';
import { useEffect, useState } from 'react';
import { getEmployeeById } from '../../../services/employees.service';

export const getDefaultFormData = (foundEmp?: IEmployee): CreateOrUpdateEmployeeFormData => {
  if (foundEmp) {
    return {
      email: foundEmp.email,
      firstName: foundEmp.firstName,
      lastName: foundEmp.lastName,
      jobTitle: foundEmp.jobTitle,
      department: foundEmp.department,
      joiningDate: new Date(foundEmp.joiningDate),
    };
  } else {
    return {
      firstName: '',
      email: '',
      lastName: '',
      password: '',
      jobTitle: '',
      department: Departments.Development,
      joiningDate: new Date(),
    };
  }
};

export const mapFormDataToCreateRequestData = (data: CreateOrUpdateEmployeeFormData): CreateEmployeeRequest => {
  return {
    email: data.email!,
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password!,
    jobTitle: data.jobTitle,
    department: data.department,
    joiningDate: data.joiningDate.toISOString(),
  };
};

export const mapFormDataToUpdateRequestData = (
  employeeId: number,
  data: CreateOrUpdateEmployeeFormData,
): UpdateEmployeeRequest => {
  return {
    employeeId: employeeId,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    jobTitle: data.jobTitle,
    department: data.department,
    joiningDate: data.joiningDate.toISOString(),
  };
};

export const departmentOptions = [
  { label: 'Development', id: Departments.Development },
  { label: 'Design', id: Departments.Design },
  { label: 'Testing', id: Departments.Testing },
  { label: 'HR', id: Departments.HR },
];

export const useFetchNeededDataForUpdate = () => {
  const { employeeId } = useParams();
  const [foundEmp, setFoundEmp] = useState<IEmployee | null>(null);

  useEffect(() => {
    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId]);

  const fetchEmployee = async () => {
    const res = await getEmployeeById(Number(employeeId));
    setFoundEmp(res.data.employee);
  };

  return {
    foundEmp,
  };
};
