export const RoutesMap = {
  signIn: {
    path: `/signIn`,
  },
  home: {
    path: `/private/adminHome`,
  },
  products: {
    path: `/private/products`,
  },
  createProduct: {
    path: `/private/products/create`,
  },
  editProduct: {
    path: `/private/products/:productId/edit`,
  },
  categories: {
    path: `/private/categories`,
  },
  createCategory: {
    path: `/private/categories/create`,
  },
  editCategory: {
    path: `/private/categories/:id/edit`,
  },
};

export const makeEditProductRoute = (empId: number) => {
  return `/private/products/${empId}/edit`;
};
