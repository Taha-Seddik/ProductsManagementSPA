export interface ISideNavItem {
  id?: string;
  index: number;
  label: string;
  icon?: string;
  image?: string;
  open: boolean;
  route?: string;
  items: ISideNavSubItem[];
}

export interface ISideNavSubItem {
  id?: string;
  label: string;
  icon?: string;
  image?: string;
  open: boolean;
  subItems: ISideNavSubOfSubItem[];
  route?: string;
}

export interface ISideNavSubOfSubItem {
  id?: string;
  label: string;
  icon?: string;
  route?: string;
}
