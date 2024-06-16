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
    path: `/private/categories/edit/:categoryId`,
  },
};

export const makeEditRoute = (id: string, editOn: 'ProductPage' | 'CategoryPage'): string => {
  switch (editOn) {
    case 'CategoryPage': {
      return makeEditCategoryRoute(id);
    }
    case 'ProductPage': {
      return makeEditCategoryRoute(id);
    }
  }
};

export const makeEditProductRoute = (pId: string) => {
  return `/private/products/edit/${pId}`;
};

export const makeEditCategoryRoute = (pId: string) => {
  return `/private/categories/edit/${pId}`;
};
