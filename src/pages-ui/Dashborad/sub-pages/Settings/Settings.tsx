import {
  Flex,
  Heading,
  Tab,
  TabIndicator,
  TabPanel,
  TabPanels,
  Tabs,
} from '@/components/Chakra';
import styles from './settings.module.scss';
import InvitationsForm from './InvitationsForm/InvitationsForm';
import PlatesForm from './PlatesForm/PlatesForm';
import IntegrationsForm from './IntegrationsForm/IntegrationsForm';

function Setting() {
  return (
    <>
      <Heading fontSize="3xl" fontWeight="bold" letterSpacing="tight">
        Settings
      </Heading>
      <Tabs>
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
