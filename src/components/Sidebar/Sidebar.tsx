import { Divider, Flex, Heading, Text } from '@/components/Chakra';
import appSettings from '@/app.json';
import NavLink from './NavLink/NavLink';
import { menuItems } from './constants';

import styles from './sidebar.module.scss';
import { getServerSession } from 'next-auth';

const Sidebar = async () => {
  // Todo: think of a logic where to store logged in user data
  // when session is active
  const session = await getServerSession();

  return (
    <Flex bgColor="blue.800" className={styles.container}>
      <Flex flexDir="column" position="sticky" top="0">
        <Flex className={styles.sidebar_box} mt={0}>
          <Heading as="h1" fontSize="24px" color="gray.100">
            {appSettings.appName}
          </Heading>
        </Flex>
        <Divider borderColor="gray.700" />
        <Flex className={styles.sidebar_box} gap="10px">
          <Text fontSize="sm" color="gray.100">
            @ {session?.user?.email}
          </Text>
          <Text fontSize="sm" color="gray.100">
            TX services
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
