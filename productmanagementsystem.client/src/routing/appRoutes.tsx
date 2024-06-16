import { Navigate, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error";
import AdminHomePage from "../pages/private/adminHomePage";
import SignInPage from "../pages/auth/signInPage";
import { RoutesMap } from "./RoutesMap";
import EmployeesPage from "../pages/private/employees/employeesPage";
import EmployeeEditionPage from "../pages/private/employees/employeeEditionPage";
import VacationsPage from "../pages/private/vacations/vacationsPage";
import VacationEditionPage from "../pages/private/vacations/vacationEditionPage";
import PrivatePage from "../pages/private/PrivatePage";

export const appRouter = createBrowserRouter([
  {
    path: RoutesMap.signIn.path,
    element: <SignInPage />,
    // lazy: () => import("./projects"),
  },
  {
    path: "/private",
    element: <PrivatePage />,
    children: [
      {
        path: RoutesMap.home.path,
        element: <AdminHomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: RoutesMap.products.path,
        element: <EmployeesPage />,
        // lazy: () => import("./projects"),
      },
      {
        path: RoutesMap.createProduct.path,
        element: <EmployeeEditionPage />,
        // lazy: () => import("./projects"),
      },
      {
        path: RoutesMap.editProduct.path,
        element: <EmployeeEditionPage />,
        // lazy: () => import("./projects"),
      },
      {
        path: RoutesMap.categories.path,
        element: <VacationsPage />,
        // lazy: () => import("./projects"),
      },
      {
        path: RoutesMap.createCategory.path,
        element: <VacationEditionPage />,
        // lazy: () => import("./projects"),
      },
      {
        path: RoutesMap.editCategory.path,
        element: <VacationEditionPage />,
        // lazy: () => import("./projects"),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={RoutesMap.signIn.path} />,
    index: true,
    // lazy: () => import("./projects"),
  },
]);
