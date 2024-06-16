import itemsjs from 'itemsjs';

/**
 ** Do search using itemjs library
 **/

const deepCloneItems = (arr: any[]) => arr.map((x) => ({ ...x }));

export const makeTextSearch = <T>(arr: T[], searchQuery: string, searchFileds: (keyof T)[]) => {
  try {
    const itemsJsInstance = itemsjs(deepCloneItems(arr), {
      searchableFields: searchFileds,
    });
    const searchResult = itemsJsInstance.search({ query: searchQuery, per_page: 10000 }).data;
    return searchResult;
  } catch (error) {
    console.error('failed to make filtering', error);
    return null;
  }
};
