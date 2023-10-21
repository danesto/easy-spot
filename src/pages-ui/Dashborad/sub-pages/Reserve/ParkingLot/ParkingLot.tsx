import { Grid } from '@/components/Chakra';
import { ParkingSpot, Reservations } from '@prisma/client';
import { ParkingSpot as Spot } from './ParkingSpot/ParkingSpot';
import { getTotalParkingSpotsByLot } from '@/queries/parking-lot';
import { getReservations } from '@/queries/reservations';
import { FilteringParams } from '@/constants/query-params';

interface ParkingLotProps {
  spots?: (ParkingSpot & { parkingLot: { name: string } })[];
  total?: number | null;
  reservations?: (Reservations & { user: { email: string | null } })[] | null;
  searchParams: any;
}

export async function ParkingLot({ searchParams }: ParkingLotProps) {
  const parkingLotId = searchParams[FilteringParams.ParkingLot];
  const search = searchParams[FilteringParams.Search];

  const spots = await getTotalParkingSpotsByLot({
    parkingLotId: parseInt(parkingLotId as string),
    search: search as string,
  });

  const reservations = await getReservations();

  return (
    <Grid
      gridTemplateColumns="repeat(5, 1fr)"
      width="100%"
      columnGap="10px"
      rowGap="20px"
    >
      {spots?.spots?.map((spot) => {
        return <Spot key={spot.id} spot={spot} reservations={reservations} />;
      })}
    </Grid>
  );
}
