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
  useToast,
} from '@/components/Chakra';
import { create } from './actions';
import { useTransition } from 'react';
import { ParkingLot } from '@prisma/client';

interface EditDrawerProps {
  isEditMode?: boolean;
  handleToggleDrawer: () => void;
  isDrawerOpen: boolean;
  lot?: ParkingLot;
}

function EditDrawer({
  handleToggleDrawer,
  isDrawerOpen,
  isEditMode,
  lot,
}: EditDrawerProps) {
  const [isPending, startTransition] = useTransition();

  const toast = useToast();

  const drawerTitle = isEditMode ? `Editing: ${lot?.name}` : 'Add parking lot';

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      //todo: add edit action if isEditMode
      const res = await create(formData);
      if (res.success) {
        handleToggleDrawer();

        toast({
          title: 'Parking lot added!',
          description: "You've sucessefully added new parking lot.",
          status: 'success',
          duration: 6000,
          variant: 'subtle',
          isClosable: true,
          position: 'top',
        });
      }
    });
  };

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
          {drawerTitle}
          {isPending && <Spinner ml="20px" />}
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
                borderRadius="sm"
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
