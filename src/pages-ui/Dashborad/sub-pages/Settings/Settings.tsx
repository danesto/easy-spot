'use client';
import {
  Flex,
  Heading,
  Tab,
  TabIndicator,
  TabPanel,
  TabPanels,
  Tabs,
  useTabs,
} from '@/components/Chakra';
import styles from './settings.module.scss';
import InvitationsForm from './InvitationsForm/InvitationsForm';
import PlatesForm from './PlatesForm/PlatesForm';
import IntegrationsForm from './IntegrationsForm/IntegrationsForm';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { TAB_INDEXES_MAP } from './constants';

function Setting() {
  const { selectedIndex, setSelectedIndex } = useTabs({ id: 'settings-tabs' });
  const router = useRouter();

  const searchParams = useSearchParams();
  const activeTabFromUrl = searchParams.get('tab');

  const onTabsChange = (index: number) => {
    setSelectedIndex(index);
    router.push(
      `/dashboard/settings?tab=${Object.keys(TAB_INDEXES_MAP)[index]}`
    );
  };

  useEffect(() => {
    if (activeTabFromUrl) {
      setSelectedIndex(TAB_INDEXES_MAP[activeTabFromUrl]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabFromUrl]); //Only fire this useEffect URLSearchParam is changed

  return (
    <>
      <Heading fontSize="3xl" fontWeight="bold" letterSpacing="tight">
        Settings
      </Heading>
      <Tabs index={selectedIndex} id="settings-tabs" onChange={onTabsChange}>
        <Flex className={styles.tabs}>
          <Tab>Collaboration</Tab>
          <Tab>Personal info</Tab>
          <Tab>Notifications</Tab>
        </Flex>

        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />

        <Flex
          className={styles.settingsContainer}
          borderRadius="sm"
          flexDirection="column"
        >
          <TabPanels>
            <TabPanel>
              <InvitationsForm />
            </TabPanel>
            <TabPanel>
              <PlatesForm />
            </TabPanel>
            <TabPanel>
              <IntegrationsForm />
            </TabPanel>
          </TabPanels>
        </Flex>
      </Tabs>
    </>
  );
}

export default Setting;
