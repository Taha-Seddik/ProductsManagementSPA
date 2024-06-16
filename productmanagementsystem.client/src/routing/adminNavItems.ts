import { ISideNavItem } from '../models/sideNavTypes';
import { RoutesMap } from './RoutesMap';

export const adminSideNavItems: { [key: string]: ISideNavItem } = {
  Dashboard: {
    index: 0,
    label: 'Dashboard',
    open: false,
    icon: 'dashboard',
    route: RoutesMap.home.path,
    items: [],
  },
  Employees: {
    index: 0,
    label: 'Employees',
    open: false,
    icon: 'people',
    route: RoutesMap.employees.path,
    items: [],
  },
  Vacations: {
    index: 0,
    label: 'Vacations',
    open: false,
    icon: 'beach_access',
    route: RoutesMap.vacations.path,
    items: [],
  },
};
