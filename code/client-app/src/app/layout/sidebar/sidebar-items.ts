import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Rental',
    icon: 'fas fa-clipboard-list',
    class: 'menu-toggle',
    accessControl: [],
    groupTitle: false,
    submenu: [
      {
        path: '../rentals/addOwner',
        title: 'Add Owner',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        accessControl: [],
        submenu: []
      },
      {
        path: '../rentals/rentalowners',
        title: 'Rental Owners',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        accessControl: [],
        submenu: []
      },
      {
        path: '',
        title: 'Map Property',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        accessControl: [],
        submenu: []
      },
      {
        path: '',
        title: 'Documentation ',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        accessControl: [],
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Tanent',
    icon: 'fas fa-clipboard-list',
    class: 'menu-toggle',
    accessControl: [],
    groupTitle: false,
    submenu: [
      {
        path: '',
        title: 'Add Tanent',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        accessControl: [],
        submenu: []
      },
      {
        path: '',
        title: 'Documentation ',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        accessControl: [],
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Property',
    icon: 'fas fa-user-md',
    class: 'menu-toggle',
    groupTitle: false,
    accessControl: [],
    submenu: [
      {
        path: '../property/addProperty',
        title: 'Add Property',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        accessControl: [],
        submenu: []
      },
      {
        path: '',
        title: 'Map Property',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        accessControl: [],
        submenu: []
      },
      {
        path: '../property/viewPropertyList',
        title: 'Property List',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        accessControl: [],
        submenu: []
      }
    ]
  },
  ];
