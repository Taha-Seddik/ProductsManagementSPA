import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../utils/useDebounce';
import { makeTextSearch } from '../utils/filter.utils';
import { getAllProducts, getProductById } from '../services/products.service';
import { IProductDTO } from '../models/entities/product';
import { useParams } from 'react-router-dom';
import { ICategoryDTO } from '../models/entities/category';
import { getAllCategories } from '../services/categories.service';

export const useFetchProductsListingNeededData = () => {
  const [products, setProducts] = useState<IProductDTO[]>([]);
  const [categories, setCategories] = useState<ICategoryDTO[] | null>(null);

  useEffect(() => {
    fetchRows();
    fetchCategories();
  }, []);

  const fetchRows = async () => {
    const res = await getAllProducts();
    setProducts(res.data.products);
  };

  const fetchCategories = async () => {
    const res = await getAllCategories();
    setCategories(res.data.categories);
  };

  return {
    products,
    categories,
    fetchRows,
    fetchCategories,
  };
};

export const useProductsData = () => {
  const [searchText, setSearchTxt] = useState<string>('');
  const [chosenCategoriesIds, setChosenCategoriesIds] = useState<string[]>([]);
  const { products, categories, fetchRows } = useFetchProductsListingNeededData();
  const [productsToShow, setProductsToShow] = useState<IProductDTO[]>([]);
  const categoriesOptions = useMemo(() => {
    return categories?.map((x) => ({ id: x.id, label: x.nameEn }));
  }, []);

  useEffect(() => {
    setSearchTxt('');
    setChosenCategoriesIds([]);
    setProductsToShow(products);
  }, [products]);

  const handleProcessSearching = (newVal: string) => {
    const productsToProcess = chosenCategoriesIds.length
      ? products.filter((p) => chosenCategoriesIds.includes(p.category.id))
      : products;
    const searchResult = makeTextSearch(productsToProcess, newVal, ['name', 'isbn']);
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

  const handleFilterByCategory = () => {};

  return {
    employeesToShow: productsToShow,
    searchText,
    chosenCategoriesIds,
    categories,
    categoriesOptions,
    fetchRows,
    handleNewSearch,
    clearSearchTxt,
    setChosenCategoriesIds,
  };
};

export const useFetchNeededDataForUpdate = () => {
  const { productId } = useParams();
  const [productObj, setProductObj] = useState<IProductDTO | null>(null);
  const [categories, setCategories] = useState<ICategoryDTO[] | null>(null);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
    fetchCategories();
  }, [productId]);

  const fetchProduct = async () => {
    const res = await getProductById(productId!);
    setProductObj(res.data.product);
  };

  const fetchCategories = async () => {
    const res = await getAllCategories();
    setCategories(res.data.categories);
  };

  return {
    productObj,
    categories,
  };
};
