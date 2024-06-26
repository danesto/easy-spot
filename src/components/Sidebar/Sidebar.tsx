'use client';
import { Divider, Flex, Heading, Text } from '@/components/Chakra';
import appSettings from '@/app.json';
import NavLink, { NavLinkProps } from './NavLink/NavLink';
import { Home, Calendar, Layers } from 'react-feather';

import styles from './sidebar.module.scss';
import { useContext } from 'react';
import { AuthContext } from '@/app/providers/auth-provider';
import Logo from '@/assets/logo-light.svg';
import Link from 'next/link';
import Image from 'next/image';

const Sidebar = () => {
  const user = useContext(AuthContext);

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
      isHidden: !user?.isAdmin,
    },
  ];

  return (
    <Flex bgColor="blue.800" className={styles.container}>
      <Flex flexDir="column" position="sticky" top="0">
        <Flex className={styles.sidebar_box} mt={0}>
          <Image
            src={Logo.src}
            alt="freespot logo white"
            width={20}
            height={20}
          />
          <Heading as="h1" fontSize="24px" color="gray.100">
            {appSettings.appName}
          </Heading>
        </Flex>
        <Divider borderColor="gray.700" />
        <Flex className={styles.sidebar_box} gap="10px">
          <Text as={Link} href="/" fontSize="sm" color="gray.100">
            @ {user?.email}
          </Text>
          <Text fontSize="sm" color="gray.100">
            {user?.organization?.name}
          </Text>
        </Flex>
        <Divider borderColor="gray.700" />
        <Flex className={styles.sidebar_box} gap="7px">
          {menuItems.map((item) => {
            return <NavLink key={item.label} {...item} />;
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
