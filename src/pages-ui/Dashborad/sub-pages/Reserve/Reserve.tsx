import { Divider, Flex, Heading } from '@/components/Chakra';

import { ParkingLot } from './ParkingLot/ParkingLot';
import { Filters } from './Filters/Filters';

import { getTotalParkingSpotsByLot } from '@/queries/parking-lot';
import { getReservations } from '@/queries/reservations';

export default async function Reserve() {
  const parkingSpaces = await getTotalParkingSpotsByLot();
  const reservations = await getReservations();

  return (
    <Flex flexDir="column" gap="50px">
      <Heading as="h2" fontSize="2xl" fontWeight="semibold">
        Reservations
      </Heading>
      <Flex flexDir="column" gap="40px" alignItems="flex-start">
        <Filters />
        <Divider mt={0} orientation="horizontal" />
        <ParkingLot {...parkingSpaces} reservations={reservations} />
      </Flex>
    </Flex>
  );
}
