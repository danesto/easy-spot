import type { Metadata } from 'next';
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
import { ChevronDownIcon } from '@/components/Icon';
import { getServerSession } from 'next-auth';
import { getUser } from '@/queries/user';
import Sidebar from '@/components/Sidebar/Sidebar';
import AuthProvider from '../providers/auth-provider';
import Link from 'next/link';

import '../globals.css';

export const metadata: Metadata = {
  title: 'FreeSpot',
  description: 'Parking reservations managment made easy',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const currentUser = await getUser(session?.user?.email || '');

  return (
    <AuthProvider user={currentUser ?? null}>
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
            <Menu placement="bottom-end">
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
              <MenuList marginTop="1" borderRadius="sm" borderColor="gray.400">
                <MenuItem as={Link} href="/dashboard/settings">
                  Settings
                </MenuItem>
                <MenuItem>Help</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </header>

        <Sidebar />
        <main>
          <div className="content-wrapper">{children}</div>
        </main>
      </Grid>
    </AuthProvider>
  );
}
