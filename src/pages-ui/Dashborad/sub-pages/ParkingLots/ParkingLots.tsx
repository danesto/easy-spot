'use client';

import Card from '@/components/Card';
import {
  Badge,
  Flex,
  Stack,
  Text,
  useDisclosure,
  Heading,
  IconButton,
  Grid,
} from '@/components/Chakra';

import EditDrawer from './EditDrawer/EditDrawer';
import Empty from '@/components/Empty';
import { Plus } from 'react-feather';

import styles from './parking-lots.module.scss';
import { useState } from 'react';
import { ParkingLot } from '@prisma/client';

interface ParkingLotsProps {
  lots?: any[];
}

function ParkingLots({ lots }: ParkingLotsProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [lot, setLot] = useState<ParkingLot>();

  const { isOpen, onOpen, onClose } = useDisclosure({
    id: 'edit-parking-lot-drawer',
  });

  const handleSetEditMode = (isEditMode: boolean, lot?: ParkingLot) => () => {
    setIsEditMode(isEditMode);
    setLot(lot);
    onOpen();
  };

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
          onClick={handleSetEditMode(false)}
        />
      </Heading>
      <Grid
        className={styles.parkingLotContainer}
        alignItems="center"
        gap="10px"
      >
        {lots && lots.length === 0 ? (
          <Empty />
        ) : (
          lots?.map((lot) => {
            return (
              <Card
                key={lot?.name}
                title={lot?.name}
                buttonLabel="Edit"
                onButtonClick={handleSetEditMode(true, lot)}
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

        <EditDrawer
          isDrawerOpen={isOpen}
          handleToggleDrawer={onClose}
          isEditMode={isEditMode}
          lot={lot}
        />
      </Grid>
    </Stack>
  );
}

export default ParkingLots;
