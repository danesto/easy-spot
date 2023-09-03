import { Divider, Flex, Heading } from '@/components/Chakra';

import { ParkingLot } from './ParkingLot/ParkingLot';
import { Filters } from './Filters/Filters';

import { getUser } from '@/queries/user';

export default async function Reserve() {
  const users = await getUser();

  return (
    <Flex flexDir="column" gap="50px">
      <Heading as="h2" fontSize="2xl" fontWeight="semibold">
        Reservations
      </Heading>
      <Flex flexDir="column" gap="40px" alignItems="flex-start">
        <Filters />
        <Divider mt={0} orientation="horizontal" />
        <ParkingLot />
      </Flex>
    </Flex>
  );
}
