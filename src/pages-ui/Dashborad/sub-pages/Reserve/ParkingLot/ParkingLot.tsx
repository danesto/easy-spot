'use client';
import { Grid, Skeleton, Text } from '@/components/Chakra';
import { ParkingSpot as Spot } from './ParkingSpot/ParkingSpot';
import { getReservations, getSpots } from './fetchers';
import { useSearchParams } from 'next/navigation';
import { FilteringParams } from '@/constants/query-params';
import { formatDate, toPrismaDate } from '@/helpers/date';
import useSWR from 'swr';

export function ParkingLot() {
  const searchParams = useSearchParams();

  const lotId = searchParams.get(FilteringParams.ParkingLot);
  const search = searchParams.get(FilteringParams.Search);
  const date = searchParams.get(FilteringParams.Date);
  const availableOnly = searchParams.get(FilteringParams.AvailableOnly);

  const {
    data: reservation,
    isLoading: isReservationsLoading,
    isValidating: isReservationsValidating,
  } = useSWR(
    ['reservations', date],
    () =>
      getReservations({
        // ensures that either query is sent for today or with picked value
        date: toPrismaDate(date ?? undefined),
      }),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  const { data, isLoading, isValidating } = useSWR(
    ['spots', lotId, search, availableOnly],
    () =>
      getSpots({
        parkingLotId: parseInt(lotId as string),
        search: search as string,
        availableOnly: availableOnly === 'true',
      }),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  const isDataLoading = isLoading || isReservationsLoading;

  return (
    <>
      <Text alignSelf="end">
        Reserving for:{' '}
        <Text as="span" fontWeight="medium">
          {date ?? `${formatDate(new Date().toString())}`}
        </Text>
      </Text>
      <Grid
        gridTemplateColumns="repeat(5, 1fr)"
        width="100%"
        columnGap="10px"
        rowGap="20px"
        className="lot"
      >
        {!!isDataLoading &&
          Array.from({ length: 15 }).map((t, index) => {
            return <Skeleton key={index} height="150px" borderRadius="sm" />;
          })}

        {!!!isDataLoading &&
          data?.spots?.map((spot: any) => {
            return (
              <Spot
                key={spot.id}
                spot={spot}
                reservations={reservation}
                isValidating={isValidating || isReservationsValidating}
              />
            );
          })}
      </Grid>
    </>
  );
}
