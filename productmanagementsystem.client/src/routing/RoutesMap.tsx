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
    path: `/private/products/edit/:productId`,
  },
  categories: {
    path: `/private/categories`,
  },
  createCategory: {
    path: `/private/categories/create`,
  },
  editCategory: {
    path: `/private/categories/edit/:id`,
  },
};

export const makeEditProductRoute = (pId: number) => {
  return `/private/products/edit/${pId}`;
};
