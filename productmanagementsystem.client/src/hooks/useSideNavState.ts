import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ISideNavItem } from "../models/sideNavTypes";

export const useSideNavState = (navItemsObj: { [key: string]: ISideNavItem }) => {
  const navigate = useNavigate();
  const [navItems, setNavItems] = React.useState(navItemsObj);

  useEffect(() => {
    if (navItemsObj) {
      setNavItems(navItemsObj);
    }
  }, [navItemsObj]);

  const closeAllOpenedItems = (state: { [key: string]: ISideNavItem }, currentItemKey: string) => {
    Object.keys(state).forEach((key) => {
      if (key !== currentItemKey) state[key].open = false;
    });
  };

  const handleItemClick = (event: React.MouseEvent, itemKey: string) => {
    // prevent routing
    event.preventDefault();
    const item = navItems[itemKey];
    if (item.items.length > 0) {
      // update state
      setNavItems((prevState) => {
        closeAllOpenedItems(prevState, itemKey);
        const itemNewState = { ...item };
        itemNewState.open = !itemNewState.open;
        return {
          ...prevState,
          [itemKey]: itemNewState,
        };
      });
    } else {
      navigate(item.route!);
    }
  };

  const handleSubItemClick = (event: React.MouseEvent, itemKey: string, subItemIndex: number) => {
    // prevent routing
    event.preventDefault();
    const item = navItems[itemKey];
    const subItem = item.items[subItemIndex];
    if (subItem.subItems.length > 0) {
      setNavItems((prevState) => {
        const itemPrevState = { ...item };
        const subItemState = { ...subItem };
        subItemState.open = !subItemState.open;
        itemPrevState.items[subItemIndex] = subItemState;
        return {
          ...prevState,
          [itemKey]: itemPrevState,
        };
      });
    } else {
      navigate(subItem.route!);
    }
  };

  const isItemActive = (match: any, location: any, item: ISideNavItem) => {
    const pathWithoutLastPart = location.pathname.slice(0, location.pathname.lastIndexOf("/"));
    if (item?.items?.length === 0 && match) {
      return true;
    } else if (pathWithoutLastPart === item.route) {
      return true;
    } else {
      return false;
    }
  };

  return {
    isItemActive,
    handleSubItemClick,
    handleItemClick,
    navItems,
  };
};
