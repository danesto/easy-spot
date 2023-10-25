'use client';
import { Grid, Skeleton } from '@/components/Chakra';
import { ParkingSpot as Spot } from './ParkingSpot/ParkingSpot';
import { getReservations, getSpots } from './fetchers';
import { useSearchParams } from 'next/navigation';
import { FilteringParams } from '@/constants/query-params';
import useSWR from 'swr';

export function ParkingLot() {
  const searchParams = useSearchParams();

  const lotId = searchParams.get(FilteringParams.ParkingLot);
  const search = searchParams.get(FilteringParams.Search);
  const date = searchParams.get(FilteringParams.Date);

  const { data, isLoading } = useSWR(['spots', lotId, search], () =>
    getSpots({
      parkingLotId: parseInt(lotId as string),
      search: search as string,
    })
  );

  const { data: reservation, isLoading: isReservationsLoading } = useSWR(
    ['reservations', date],
    () =>
      getReservations({
        date: date ?? undefined,
      }),
    {
      shouldRetryOnError: false,
    }
  );

  const isDataLoading = isLoading || isReservationsLoading;

  return (
    <Grid
      gridTemplateColumns="repeat(5, 1fr)"
      width="100%"
      columnGap="10px"
      rowGap="20px"
    >
      {!!isDataLoading &&
        Array.from({ length: 15 }).map((t, index) => {
          return <Skeleton key={index} height="150px" borderRadius="sm" />;
        })}

      {!!!isDataLoading &&
        data?.spots?.map((spot: any) => {
          return <Spot key={spot.id} spot={spot} reservations={reservation} />;
        })}
    </Grid>
  );
}
