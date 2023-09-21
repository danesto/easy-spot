import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Input,
  Spinner,
} from '@/components/Chakra';
import { create } from './actions';
import { useTransition } from 'react';

function EditDrawer({ handleToggleDrawer, isDrawerOpen }: any) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const res = await create(formData);
      if (res.success) {
        handleToggleDrawer();
      }
    });
  };

  console.log(isPending);

  return (
    <Drawer
      placement="right"
      isOpen={isDrawerOpen}
      onClose={handleToggleDrawer}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          Add parking lot
          {isPending && <Spinner />}
        </DrawerHeader>
        <DrawerBody>
          <form action={handleSubmit} method="post">
            <Flex flexDirection="column" maxWidth="90%" mt="40px">
              <Flex flexDirection="column">
                <FormLabel>Parking lot name:</FormLabel>
                <Input name="name" placeholder="Garage Main" />
              </Flex>
              <Flex flexDirection="column" mt="30px">
                <FormLabel>Number of spaces:</FormLabel>
                <Input type="number" name="number_of_spaces" placeholder="20" />
              </Flex>
              <Flex flexDirection="column" mt="30px">
                <FormLabel>Prefix:</FormLabel>
                <Input name="prefix" placeholder="GM" />
              </Flex>
              <Button
                mt="30px"
                colorScheme="blue"
                type="submit"
                alignSelf="flex-start"
              >
                Add parking lot
              </Button>
            </Flex>
          </form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default EditDrawer;
