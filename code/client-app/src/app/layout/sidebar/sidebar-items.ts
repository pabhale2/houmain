import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Rental',
    icon: 'fas fa-clipboard-list',
    class: 'menu-toggle',
    accessControl: ['ADMIN_USER', 'STANDARD_USER', 'OWNER'],
    groupTitle: false,
    submenu: [
      {
        path: '../rentals/addOwner',
        title: 'Add Owner',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        accessControl: ['ADMIN_USER', 'STANDARD_USER', 'OWNER'],
        submenu: []
      },
      {
        path: '../rentals/rentalowners',
        title: 'Rental Owners',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        accessControl: ['ADMIN_USER', 'STANDARD_USER', 'OWNER'],
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Tenant',
    icon: 'fas fa-clipboard-list',
    class: 'menu-toggle',
    accessControl: ['ADMIN_USER', 'STANDARD_USER', 'TENANT'],
    groupTitle: false,
    submenu: [
      {
        path: '../tenants/addTenant',
        title: 'Add Tenant',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        accessControl: ['ADMIN_USER', 'STANDARD_USER', 'TENANT'],
        submenu: []
      },
      {
        path: '../tenants/showTenants',
        title: 'All Tenants',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        accessControl: ['ADMIN_USER', 'STANDARD_USER', 'TENANT'],
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
    accessControl: ['ADMIN_USER', 'STANDARD_USER', 'OWNER', 'TENANT', 'INSPECTOR'],
    submenu: [
      {
        path: '../property/addProperty',
        title: 'Add Property',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        accessControl: ['ADMIN_USER', 'STANDARD_USER', 'OWNER'],
        submenu: []
      },
      {
        path: '../property/viewPropertyList',
        title: 'Property List',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        accessControl: ['ADMIN_USER', 'STANDARD_USER', 'OWNER', 'INSPECTOR'],
        submenu: []
      },
      {
        path: '../property/showcase-property',
        title: 'Properties',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        accessControl: ['TENANT'],
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'User',
    icon: 'fas fa-user-md',
    class: 'menu-toggle',
    groupTitle: false,
    accessControl: ['ADMIN_USER', 'STANDARD_USER'],
    submenu: [
      {
        path: '../user/addUser',
        title: 'Add User',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        accessControl: ['ADMIN_USER', 'STANDARD_USER'],
        submenu: []
      },
      {
        path: '../user/showUsers',
        title: 'Users List',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        accessControl: ['ADMIN_USER', 'STANDARD_USER'],
        submenu: []
      }
    ]
  },
];
