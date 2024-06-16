import { useEffect, useState } from 'react';
import { useDebounce } from '../utils/useDebounce';
import { makeTextSearch } from '../utils/filter.utils';
import { getAllProducts, getProductById } from '../services/products.service';
import { IProductDTO } from '../models/entities/product';
import { useParams } from 'react-router-dom';
import { ICategoryDTO } from '../models/entities/category';
import { getAllCategories } from '../services/categories.service';

export const useFetchProductsListingNeededData = () => {
  const [products, setProducts] = useState<IProductDTO[]>([]);

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = async () => {
    const res = await getAllProducts();
    setProducts(res.data.products);
  };

  return {
    products,
    fetchRows,
  };
};

export const useProductsData = () => {
  const [searchText, setSearchTxt] = useState<string>('');
  const { products, fetchRows } = useFetchProductsListingNeededData();
  const [productsToShow, setProductsToShow] = useState<IProductDTO[]>([]);

  useEffect(() => {
    setSearchTxt('');
    setProductsToShow(products);
  }, [products]);

  const handleProcessSearching = (newVal: string) => {
    const searchResult = makeTextSearch(products, newVal, ['name', 'isbn']);
    const newOnesForDispaly = searchResult!.items;
    setProductsToShow(newOnesForDispaly);
  };

  const debouncedDoSearch = useDebounce(handleProcessSearching, 500);

  const handleNewSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setSearchTxt(newVal);
    debouncedDoSearch(newVal);
  };

  const clearSearchTxt = () => {
    setSearchTxt('');
    debouncedDoSearch('');
  };

  return {
    employeesToShow: productsToShow,
    searchText,
    fetchRows,
    handleNewSearch,
    clearSearchTxt,
  };
};

export const useFetchNeededDataForUpdate = () => {
  const { productId } = useParams();
  const [productObj, setProductObj] = useState<IProductDTO | null>(null);
  const [categories, setCategories] = useState<ICategoryDTO[] | null>(null);

  useEffect(() => {
    if (productId) {
      fetchProduct();
      fetchCategories();
    }
  }, [productId]);

  const fetchProduct = async () => {
    const res = await getProductById(productId!);
    setProductObj(res.data);
  };

  const fetchCategories = async () => {
    const res = await getAllCategories();
    setCategories(res.data);
  };

  return {
    productObj,
    categories,
  };
};
