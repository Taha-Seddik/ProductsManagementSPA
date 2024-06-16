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
  const [chosenCategoryId, setChosenCategoryId] = useState<string>('');
  const { products, categories, fetchRows } = useFetchProductsListingNeededData();
  const [productsToShow, setProductsToShow] = useState<IProductDTO[]>([]);
  const categoriesOptions = useMemo(() => {
    const rawCategs = categories?.map((x) => ({ id: x.id, label: x.nameEn }));
    rawCategs?.unshift({ id: '', label: 'All' });
    return rawCategs;
  }, [categories]);

  useEffect(() => {
    setSearchTxt('');
    setChosenCategoryId('');
    setProductsToShow(products);
  }, [products]);

  const handleProcessSearching = (newVal: string) => {
    const productsToProcess = chosenCategoryId ? products.filter((p) => p.category.id === chosenCategoryId) : products;
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

  const doFilterByCategory = (newCategId: string) => {
    if (newCategId !== '') {
      setChosenCategoryId(newCategId);
      const productsToProcess = newCategId ? products.filter((p) => p.category.id === newCategId) : products;
      const searchResult = makeTextSearch(productsToProcess, searchText, ['name', 'isbn']);
      const newOnesForDispaly = searchResult!.items;
      setProductsToShow(newOnesForDispaly);
    } else {
      setChosenCategoryId('');
      const searchResult = makeTextSearch(products, searchText, ['name', 'isbn']);
      const newOnesForDispaly = searchResult!.items;
      setProductsToShow(newOnesForDispaly);
    }
  };

  return {
    productsToShow,
    searchText,
    chosenCategoryId,
    categories,
    categoriesOptions,
    fetchRows,
    handleNewSearch,
    clearSearchTxt,
    setChosenCategoryId,
    doFilterByCategory,
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
