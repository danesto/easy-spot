'use client';

import {
  Badge,
  Button,
  GridItem,
  Heading,
  Spinner,
  useToast,
} from '@/components/Chakra';
import { reservationTypesMap, ReservationTypes } from '../types';
import { AuthContext } from '@/app/providers/auth-provider';
import { useContext, useTransition } from 'react';
import { releaseReservation, submitReservation } from '../actions';
import { getReservationType } from '../helpers';
import { useSearchParams } from 'next/navigation';
import { toPrismaDate } from '@/helpers/date';
import { FilteringParams } from '@/constants/query-params';
import { Reservations } from '@prisma/client';
import { mutate } from 'swr';
import cx from 'classnames';
import styles from '../parking-lot.module.scss';

interface ParkingSpotProps {
  spot: any;
  reservations: Reservations[];
  isValidating: boolean;
}

function ParkingSpot({ spot, reservations, isValidating }: ParkingSpotProps) {
  const toast = useToast();
  const searchParams = useSearchParams();
  const reservationDate = toPrismaDate(
    searchParams.get(FilteringParams.Date) ?? undefined
  );

  const user = useContext(AuthContext);
  const [isPending, startTransition] = useTransition();

  const isHavingReservations = reservations?.find(
    (res: any) => res.userId === user?.id
  );

  const handleSubmitReservation = () => {
    if (!!!isHavingReservations) {
      startTransition(async () => {
        // pass the date for reservations
        const newReservation = await submitReservation({
          userId: user?.id as number,
          spotId: spot.id,
          date: reservationDate,
        });

        // TODO: populate cache with newly addede element
        mutate(
          (key) => Array.isArray(key) && key[0] === 'reservations',
          async (data: any) => {
            return [...data, ...[newReservation]];
          },
          {
            revalidate: false,
          }
        );

        toast({
          title: 'Space reserved!',
          description: `You've sucessefully reserved parking spot ${spot.name}`,
          status: 'success',
          duration: 6000,
          variant: 'subtle',
          isClosable: true,
          position: 'top',
        });
      });
    } else {
      toast({
        title: 'Looks like you already have reservation!',
        description: `You can not reserve multiple spots for the same day`,
        status: 'error',
        duration: 6000,
        variant: 'subtle',
        isClosable: true,
        position: 'top',
      });
    }
  };

  const handleReleaseReservation = () => {
    if (isHavingReservations?.id) {
      try {
        startTransition(async () => {
          await releaseReservation({ reservationId: isHavingReservations.id });
        });
        mutate(
          (key) => Array.isArray(key) && key[0] === 'reservations',
          async (data: any) => {
            return data.filter(
              (res: Reservations) => res.id !== isHavingReservations.id
            );
          },
          { revalidate: false }
        );
        toast({
          title: 'Space released!',
          description: `You've sucessefully released parking spot ${spot.name}`,
          status: 'success',
          duration: 6000,
          variant: 'subtle',
          isClosable: true,
          position: 'top',
        });
      } catch (e) {
        toast({ status: 'error', title: 'Error realising' });
      }
    }
  };

  const type = getReservationType(
    spot.id,
    user?.id as number,
    reservations || []
  );

  return (
    <GridItem
      key={spot.name}
      data-reserved={spot.isReserved}
      className={cx(
        styles.parkingSpaceBox,
        reservationTypesMap[type].cardClassName
      )}
      borderRadius="sm"
    >
      <Heading fontSize="lg" as="h5" fontWeight="medium">
        {spot.name}
      </Heading>
      <Badge className={styles.badge} color="gray.600" width="max-content">
        {spot.parkingLot.name}
      </Badge>

      <Button
        isDisabled={
          reservationTypesMap[type].isButtonDisabled ||
          isPending ||
          isValidating
        }
        colorScheme={reservationTypesMap[type].buttonColorScheme}
        onClick={
          type === ReservationTypes.ReservedByMe
            ? handleReleaseReservation
            : handleSubmitReservation
        }
      >
        {reservationTypesMap[type].buttonLabel}
        {!!isPending && <Spinner ml="20px" />}
      </Button>
    </GridItem>
  );
}

export { ParkingSpot };
