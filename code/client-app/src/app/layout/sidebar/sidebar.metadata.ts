// Sidebar route metadata
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  groupTitle: boolean;
  accessControl: string[];
  submenu: RouteInfo[];
}
