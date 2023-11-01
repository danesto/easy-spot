'use client';
import NextLink from 'next/link';
import { Link } from '@/components/Chakra';
import { usePathname } from 'next/navigation';
import cx from 'classnames';

import styles from './nav-link.module.scss';

export interface NavLinkProps {
  icon: JSX.Element;
  href: string;
  label: string;
  isHidden?: boolean;
}

/**
 * @description link component used for sidebar navigation with active logic
 * @prop icon: react-feather icon for link
 * @prop href: link href
 * @prop label: link label
 */
function NavLink({ icon, href, label, isHidden }: NavLinkProps) {
  const pathname = usePathname();

  if (isHidden) {
    return null;
  }

  return (
    <Link
      as={NextLink}
      href={href}
      color="white"
      fontWeight="light"
      className={cx(styles.navLink, {
        [styles.active]: pathname === href,
      })}
    >
      {icon}
      {label}
    </Link>
  );
}

export default NavLink;
