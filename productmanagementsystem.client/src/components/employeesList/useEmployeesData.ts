import { useEffect, useState } from 'react';
import { useDebounce } from '../../utils/useDebounce';
import { makeTextSearch } from '../../utils/filter.utils';
import { IEmployee } from '../../models/entities/employee';
import { getAllEmployees } from '../../services/employees.service';

export const useFetchEmployeesListingNeededData = () => {
  //   const dispatch = useDispatch<AppDispatch>();
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = async () => {
    const res = await getAllEmployees();
    setEmployees(res.data?.employees);
  };

  return {
    employees,
    fetchRows,
  };
};

export const useEmployeesData = () => {
  const [searchText, setSearchTxt] = useState<string>('');
  const { employees, fetchRows } = useFetchEmployeesListingNeededData();
  const [employeesToShow, setEmployeesToShow] = useState<IEmployee[]>([]);

  useEffect(() => {
    setSearchTxt('');
    setEmployeesToShow(employees);
  }, [employees]);

  const handleProcessSearching = (newVal: string) => {
    const searchResult = makeTextSearch(employees, newVal, ['email', 'firstName', 'jobTitle']);
    const newOnesForDispaly = searchResult!.items;
    setEmployeesToShow(newOnesForDispaly);
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
    employeesToShow,
    searchText,
    fetchRows,
    handleNewSearch,
    clearSearchTxt,
  };
};
