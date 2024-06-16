import { useEffect, useState } from 'react';
import { useDebounce } from '../utils/useDebounce';
import { makeTextSearch } from '../utils/filter.utils';
import { useParams } from 'react-router-dom';
import { ICategoryDTO } from '../models/entities/category';
import { getAllCategories, getCategoryById } from '../services/categories.service';

export const useFetchCategoriesListingNeededData = () => {
  const [categories, setCategories] = useState<ICategoryDTO[]>([]);

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = async () => {
    const res = await getAllCategories();
    setCategories(res.data.categories);
  };

  return {
    categories,
    fetchRows,
  };
};

export const useCategoriesData = () => {
  const [searchText, setSearchTxt] = useState<string>('');
  const [chosenCategoryId, setChosenCategoryId] = useState<string>('');
  const { categories, fetchRows } = useFetchCategoriesListingNeededData();
  const [categoriesToShow, setCategoriesToShow] = useState<ICategoryDTO[]>([]);

  useEffect(() => {
    setSearchTxt('');
    setChosenCategoryId('');
    setCategoriesToShow(categories);
  }, [categories]);

  const handleProcessSearching = (newVal: string) => {
    const searchResult = makeTextSearch(categories, newVal, ['nameEn', 'nameAr']);
    const newOnesForDispaly = searchResult!.items;
    setCategoriesToShow(newOnesForDispaly);
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
    categoriesToShow,
    searchText,
    chosenCategoryId,
    categories,
    fetchRows,
    handleNewSearch,
    clearSearchTxt,
    setChosenCategoryId,
  };
};

export const useFetchNeededDataForUpdate = () => {
  const { categoryId } = useParams();
  const [categoryObj, setCategObj] = useState<ICategoryDTO | null>(null);

  useEffect(() => {
    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  const fetchCategory = async () => {
    const res = await getCategoryById(categoryId!);
    setCategObj(res.data.category);
  };

  return {
    categoryObj,
  };
};
