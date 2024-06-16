import { Navigate, createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/error';
import AdminHomePage from '../pages/private/home/adminHomePage';
import SignInPage from '../pages/auth/signInPage';
import { RoutesMap } from './RoutesMap';
import ProductsPage from '../pages/private/products/productsPage';
import ProductEditionPage from '../pages/private/products/productEditionPage';
import PrivatePage from '../pages/private/PrivatePage';

export const appRouter = createBrowserRouter([
  {
    path: RoutesMap.signIn.path,
    element: <SignInPage />,
  },
  {
    path: '/private',
    element: <PrivatePage />,
    children: [
      {
        path: RoutesMap.home.path,
        element: <AdminHomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: RoutesMap.products.path,
        element: <ProductsPage />,
      },
      {
        path: RoutesMap.createProduct.path,
        element: <ProductEditionPage />,
      },
      {
        path: RoutesMap.editProduct.path,
        element: <ProductEditionPage />,
      },
      // {
      //   path: RoutesMap.categories.path,
      //   element: <VacationsPage />,
      // },
      // {
      //   path: RoutesMap.createCategory.path,
      //   element: <VacationEditionPage />,
      // },
      // {
      //   path: RoutesMap.editCategory.path,
      //   element: <VacationEditionPage />,
      // },
    ],
  },
  {
    path: '*',
    element: <Navigate to={RoutesMap.signIn.path} />,
    index: true,
  },
]);
