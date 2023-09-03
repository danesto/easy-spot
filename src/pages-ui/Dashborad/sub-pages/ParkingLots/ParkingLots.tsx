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
  Heading,
  Button,
  IconButton,
} from '@/components/Chakra';

import EditDrawer from './EditDrawer/EditDrawer';
import Empty from '@/components/Empty';
import { Plus } from 'react-feather';

interface ParkingLotsProps {
  lots?: any[];
}

function ParkingLots({ lots }: ParkingLotsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure({
    id: 'edit-parking-lot-drawer',
  });

  console.log(lots);
  return (
    <Stack gap="40px">
      <Heading fontSize="2xl" as="h2" fontWeight="semibold">
        Parking lots
        <IconButton
          size="sm"
          aria-label="add-parking-lots"
          icon={<Plus size="18px" />}
          color="white"
          ml="10px"
          colorScheme="blue"
          onClick={onOpen}
        />
      </Heading>
      <Flex alignItems="center">
        {lots && lots.length === 0 ? (
          <Empty />
        ) : (
          lots?.map((lot) => {
            return (
              <Card
                key={lot?.name}
                title={lot?.name}
                buttonLabel="Edit"
                onButtonClick={onOpen}
              >
                <Stack>
                  <Flex alignItems="center" gap="10px">
                    <Text>Parking spaces: </Text>
                    <Badge colorScheme="blue">{lot?.numberOfSpots}</Badge>
                  </Flex>
                  <Flex alignItems="center" gap="10px">
                    <Text>Prefix: </Text>
                    <Badge colorScheme="blue">{lot?.prefix}</Badge>
                  </Flex>
                </Stack>
              </Card>
            );
          })
        )}

        <EditDrawer isDrawerOpen={isOpen} handleToggleDrawer={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody>tet</DrawerBody>
          </DrawerContent>
        </EditDrawer>
      </Flex>
    </Stack>
  );
}

export default ParkingLots;
