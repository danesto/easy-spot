'use client';

import { Grid } from '@/components/Chakra';

import { ParkingSpot, Reservations } from '@prisma/client';
import { useContext } from 'react';
import { AuthContext } from '@/app/providers/auth-provider';
import { ParkingSpot as Spot } from './ParkingSpot/ParkingSpot';

interface ParkingLotProps {
  spots?: (ParkingSpot & { parkingLot: { name: string } })[];
  total?: number | null;
  reservations?: (Reservations & { user: { email: string | null } })[] | null;
}

export function ParkingLot({
  spots,
  total: totalSpots,
  reservations,
}: ParkingLotProps) {
  const user = useContext(AuthContext);

  return (
    <Grid
      gridTemplateColumns="repeat(5, 1fr)"
      width="100%"
      columnGap="10px"
      rowGap="20px"
    >
      {spots?.map((spot) => {
        return <Spot key={spot.id} spot={spot} reservations={reservations} />;
      })}
    </Grid>
  );
}
