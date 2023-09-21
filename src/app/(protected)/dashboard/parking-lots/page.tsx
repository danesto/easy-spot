import { getParkingLots } from '@/queries/parking-lot';
import { lazy } from 'react';

const ParkingLotsPage = lazy(
  () => import('@/pages-ui/Dashborad/sub-pages/ParkingLots/ParkingLots')
);

async function ParkingLots() {
  const parkingLots = await getParkingLots({ userId: 1 });

  return <ParkingLotsPage lots={parkingLots} />;
}

export default ParkingLots;
