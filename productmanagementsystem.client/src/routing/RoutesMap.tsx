export const RoutesMap = {
  signIn: {
    path: `/signIn`,
  },
  home: {
    path: `/private/adminHome`,
  },
  employees: {
    path: `/private/employees`,
  },
  createEmployee: {
    path: `/private/employees/create`,
  },
  editEmployee: {
    path: `/private/employees/:employeeId/edit`,
  },
  vacations: {
    path: `/private/vacations`,
  },
  createVacation: {
    path: `/private/vacations/create`,
  },
  editVacation: {
    path: `/private/vacations/:id/edit`,
  },
};

export const makeEditEmployeeRoute = (empId: number) => {
  return `/private/employees/${empId}/edit`;
};
