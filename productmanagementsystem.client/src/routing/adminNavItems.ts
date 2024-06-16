import { ISideNavItem } from "../models/sideNavTypes";
import { RoutesMap } from "./RoutesMap";

export const adminSideNavItems: { [key: string]: ISideNavItem } = {
  Dashboard: {
    index: 0,
    label: "Dashboard",
    open: false,
    icon: "dashboard",
    route: RoutesMap.home.path,
    items: [],
  },
  Products: {
    index: 0,
    label: "Products",
    open: false,
    icon: "scatter_plot",
    route: RoutesMap.products.path,
    items: [],
  },
  Categories: {
    index: 0,
    label: "Categories",
    open: false,
    icon: "category",
    route: RoutesMap.categories.path,
    items: [],
  },
};
