import ParkingLotsPage from '@/pages-ui/Dashborad/sub-pages/ParkingLots/ParkingLots';
import { getParkingLots } from '@/queries/parking-lots';

async function ParkingLots() {
  const parkingLots = await getParkingLots({ userId: 1 });

  return <ParkingLotsPage lots={parkingLots} />;
}

export default ParkingLots;
