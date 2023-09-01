import { Home, Calendar, Layers } from 'react-feather';
import { NavLinkProps } from './NavLink/NavLink';

const menuItems: NavLinkProps[] = [
  {
    icon: <Home />,
    href: '/dashboard',
    label: 'Home',
  },
  {
    icon: <Calendar />,
    href: '/dashboard/reserve',
    label: 'Reserve',
  },
  {
    icon: <Layers />,
    href: '/dashboard/parking-lots',
    label: 'Parking lots',
  },
];

export { menuItems };
