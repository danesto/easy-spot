'use client';

import {
  Badge,
  Button,
  GridItem,
  Heading,
  Spinner,
  useToast,
} from '@/components/Chakra';
import cx from 'classnames';
import { reservationTypesMap, ReservationTypes } from '../types';
import { AuthContext } from '@/app/providers/auth-provider';
import { useContext, useTransition } from 'react';
import { releaseReservation, submitReservation } from '../actions';
import { getReservationType } from '../helpers';
import styles from '../parking-lot.module.scss';
import { useSearchParams } from 'next/navigation';
import { toPrismaDate } from '@/helpers/date';
import { FilteringParams } from '@/constants/query-params';
import { Reservations } from '@prisma/client';

interface ParkingSpotProps {
  spot: any;
  reservations: Reservations[];
}

function ParkingSpot({ spot, reservations }: ParkingSpotProps) {
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

  const handleSubmitReservation = (spotName: string, spotId: number) => () => {
    if (!!!isHavingReservations) {
      startTransition(async () => {
        // pass the date for reservations
        await submitReservation({
          userId: user?.id as number,
          spotId: spotId,
          date: reservationDate,
        });

        toast({
          title: 'Space reserved!',
          description: `You've sucessefully reserved parking spot ${spotName}`,
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

  const handleReleaseReservation = (reservationId?: number) => () => {
    if (reservationId) {
      try {
        startTransition(async () => {
          await releaseReservation({ reservationId });
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
      <Badge color="gray.600" width="max-content">
        {spot.parkingLot.name}
      </Badge>

      <Button
        isDisabled={reservationTypesMap[type].isButtonDisabled || isPending}
        colorScheme={reservationTypesMap[type].buttonColorScheme}
        onClick={
          type === ReservationTypes.ReservedByMe
            ? handleReleaseReservation(isHavingReservations?.id)
            : handleSubmitReservation(spot.name, spot.id)
        }
      >
        {reservationTypesMap[type].buttonLabel}
        {!!isPending && <Spinner ml="20px" />}
      </Button>
    </GridItem>
  );
}

export { ParkingSpot };
