import { useEffect, useState } from "react";
import { useDebounce } from "../utils/useDebounce";
import { makeTextSearch } from "../utils/filter.utils";
import { getAllProducts } from "../services/products.service";
import { IProductDTO } from "../models/entities/product";

export const useFetchProductsListingNeededData = () => {
  const [products, setProducts] = useState<IProductDTO[]>([]);

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = async () => {
    const res = await getAllProducts();
    setProducts(res.data);
  };

  return {
    products,
    fetchRows,
  };
};

export const useProductsData = () => {
  const [searchText, setSearchTxt] = useState<string>("");
  const { products, fetchRows } = useFetchProductsListingNeededData();
  const [productsToShow, setProductsToShow] = useState<IProductDTO[]>([]);

  useEffect(() => {
    setSearchTxt("");
    setProductsToShow(products);
  }, [products]);

  const handleProcessSearching = (newVal: string) => {
    const searchResult = makeTextSearch(products, newVal, ["name", "iSBN"]);
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
    setSearchTxt("");
    debouncedDoSearch("");
  };

  return {
    employeesToShow: productsToShow,
    searchText,
    fetchRows,
    handleNewSearch,
    clearSearchTxt,
  };
};
