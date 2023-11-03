import { Divider, Flex, Heading } from '@/components/Chakra';
import styles from './settings.module.scss';
import InvitationsForm from './InvitationsForm/InvitationsForm';
import PlatesForm from './PlatesForm/PlatesForm';

function Setting() {
  return (
    <>
      <Heading fontSize="2xl" fontWeight="semibold">
        Settings
      </Heading>
      <Flex
        className={styles.settingsContainer}
        borderRadius="sm"
        flexDirection="column"
      >
        {/* <Divider borderColor="gray.400" mt="20px" /> */}

        <InvitationsForm />
        <Divider borderColor="gray.400" mt="20px" />
        <PlatesForm />
      </Flex>
    </>
  );
}

export default Setting;
