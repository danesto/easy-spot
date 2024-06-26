import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
  Text,
  Textarea,
} from '@/components/Chakra';

import SettingsSection from '../SettingsSection';

function InvitationsForm() {
  return (
    <SettingsSection
      title="Invite"
      subtitle="Add people to parking lots"
      tooltipContent={
        <>
          <p>1. Enter email addresses you want to add to your organization.</p>
          <p>
            2. Users with provided email addresses will get their credentials
            via email and automatically be part of the organization.
          </p>
        </>
      }
    >
      <form>
        <CheckboxGroup>
          <Stack spacing={[1, 5]} direction={['column', 'row']}>
            <Checkbox borderColor="blue.500" value="naruto">
              <Text as="span" fontWeight="bold" color="blackAlpha.800">
                Parking lot 1
              </Text>
            </Checkbox>
          </Stack>
        </CheckboxGroup>

        <FormControl mt="20px">
          <FormLabel
            fontSize="medium"
            fontWeight="600"
            width="20%"
            color="blackAlpha.800"
          >
            Users to invite:
          </FormLabel>
          <Textarea
            width="80%"
            placeholder="user@email.com, user2@email.com"
            size="sm"
          />
        </FormControl>

        <Button width="100px" mt="20px" colorScheme="blue" borderRadius="sm">
          Save
        </Button>
      </form>
    </SettingsSection>
  );
}

export default InvitationsForm;
