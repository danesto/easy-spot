import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Grid } from '@/components/Grid';
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@/components/Chakra';

import '../globals.css';
import { ChevronDownIcon } from '@/components/Icon';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FreeSpot',
  description: 'Parking reservations managment made easy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid className="layout">
      <header>
        <Flex
          maxW="1300px"
          paddingLeft="40px"
          paddingRight="40px"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/dashboard">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink color="gray.500" isCurrentPage>
                Reserve
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              aria-label="avatar settings menu"
              display="flex"
              alignItems="center"
              padding="1"
              rightIcon={<ChevronDownIcon fontSize="xl" />}
            >
              <Avatar size="sm" name="Danilo Stojanovic" />
            </MenuButton>
            <MenuList borderRadius="sm">
              <MenuItem>Podesavanja</MenuItem>
              <MenuItem>Pomoc</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </header>

      <Sidebar />
      <main>
        <div className="content-wrapper">{children}</div>
      </main>
    </Grid>
  );
}
