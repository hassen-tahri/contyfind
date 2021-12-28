import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
    hidden : true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
    hidden : true,
  },
  {
    title: 'Gestion comptes',
    icon: 'lock',
    link: '/pages/utilisateur',
  },
  {
    title: 'Paramétrage',
    icon: 'options',
    link: '/pages/parametrage',
  },
  {
    title: 'Gestion inspecteur',
    icon: 'person',
    link: '/pages/inspecteur',
  },
  {
    title: 'Gestion chargeur',
    icon: 'car',
    link: '/pages/chargeur',
  },
  {
    title: 'Constat',
    icon: 'archive',
    link: '/pages/constat',
  },
  {
    title: 'Gestion voyage',
    icon: 'paper-plane',
    link: '/pages/voyage',
  },
];
