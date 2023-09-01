'use client';

import {
  Badge,
  Button,
  Grid,
  GridItem,
  Heading,
  useToast,
} from '@/components/Chakra';

import styles from './parking-lot.module.scss';

export function ParkingLot() {
  const toast = useToast();

  const mockSpots = [
    {
      spot: 'P3',
      parkingLot: 'Garage G1',
      available: true,
    },
    {
      spot: 'P4',
      parkingLot: 'Garage G1',
      available: false,
    },
    {
      spot: 'P5',
      parkingLot: 'Garage G1',
      available: true,
    },
    {
      spot: 'P56',
      parkingLot: 'Garage G1',
      available: true,
    },
    {
      spot: 'P7',
      parkingLot: 'Garage G1',
      available: true,
    },
    {
      spot: 'P8',
      parkingLot: 'Garage G1',
      available: true,
    },
  ];

  const handleSubmitReservation = () => {
    toast({
      title: 'Space reserved!',
      description: "You've sucessefully reserved parking space G1.",
      status: 'success',
      duration: 6000,
      variant: 'subtle',
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <Grid
      gridTemplateColumns="repeat(5, 1fr)"
      width="100%"
      columnGap="10px"
      rowGap="20px"
    >
      {[...mockSpots, ...mockSpots, ...mockSpots].map((spot) => {
        return (
          <GridItem
            data-available={spot.available}
            key={spot.spot}
            className={styles.parkingSpaceBox}
            borderRadius="sm"
          >
            <Heading fontSize="lg" as="h5" fontWeight="medium">
              P4
            </Heading>
            <Badge color="gray.600" width="max-content">
              Garage G1
            </Badge>
            <Button
              disabled={!spot.available}
              isDisabled={!spot.available}
              colorScheme={spot.available ? 'blue' : 'gray'}
              onClick={handleSubmitReservation}
            >
              {spot.available ? 'Reserve' : 'Unavailable'}
            </Button>
          </GridItem>
        );
      })}
    </Grid>
  );
}
