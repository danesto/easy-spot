import {
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Text,
  Textarea,
  Tooltip,
} from '@/components/Chakra';
import styles from './settings.module.scss';
import { Info } from 'react-feather';

function Setting() {
  return (
    <Flex
      className={styles.settingsContainer}
      borderRadius="sm"
      flexDirection="column"
    >
      <Heading fontSize="2xl" fontWeight="semibold">
        Settings
      </Heading>
      <Divider mt="20px" />
      <Flex className={styles.settingsBox} flexDirection="column">
        <Heading size="md" fontWeight="semibold">
          Invite
          <Tooltip
            label={
              <>
                <p>1. Choose parking lots that you want to add users to.</p>
                <p>2. Enter comma seperated email address.</p>
              </>
            }
          >
            <Info size="15px" color="var(--chakra-colors-gray-500)" />
          </Tooltip>
        </Heading>
        <Text className={styles.description} fontSize="md">
          Add people to parking lots
        </Text>
        <form>
          <CheckboxGroup>
            <Stack spacing={[1, 5]} direction={['column', 'row']}>
              <Checkbox value="naruto">Parking lot 1</Checkbox>
              <Checkbox value="sasuke">Parking lot 2</Checkbox>
              <Checkbox value="kakashi">Parking lot 3</Checkbox>
            </Stack>
          </CheckboxGroup>
          <FormControl mt="20px">
            <FormLabel fontSize="medium" width="20%">
              Users to invite:
            </FormLabel>
            <Textarea
              width="80%"
              placeholder="user@email.com, user2@email.com"
              size="sm"
            />
          </FormControl>
          <Button variant="solid" width="100px" mt="20px" colorScheme="blue">
            Save
          </Button>
        </form>
      </Flex>
    </Flex>
  );
}

export default Setting;
