'use client';

import Card from '@/components/Card';
import {
  Badge,
  Flex,
  Stack,
  Text,
  useDisclosure,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
} from '@/components/Chakra';

import EditDrawer from './EditDrawer/EditDrawer';

const ParkingLots = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    id: 'edit-parking-lot-drawer',
  });

  return (
    <Flex>
      <Card title="Garage" buttonLabel="Edit" onButtonClick={onOpen}>
        <Stack>
          <Flex alignItems="center" gap="10px">
            <Text>Suffix: </Text>
            <Badge>G1</Badge>
          </Flex>
          <Flex alignItems="center" gap="10px">
            <Text>Parking spaces: </Text>
            <Badge>23</Badge>
          </Flex>
        </Stack>
      </Card>

      <EditDrawer isDrawerOpen={isOpen} handleToggleDrawer={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>tet</DrawerBody>
        </DrawerContent>
      </EditDrawer>
    </Flex>
  );
};

export default ParkingLots;
