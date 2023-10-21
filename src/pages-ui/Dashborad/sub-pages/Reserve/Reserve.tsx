'use server';
import { Divider, Flex, Heading, Spinner } from '@/components/Chakra';

import { ParkingLot } from './ParkingLot/ParkingLot';
import { Filters } from './Filters/Filters';
import { Suspense } from 'react';

interface ReserveProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Reserve({ searchParams }: ReserveProps) {
  return (
    <Flex flexDir="column" gap="50px">
      <Flex flexDir="column">
        <Heading as="h2" fontSize="2xl" fontWeight="semibold" mb="1">
          Reserve a spot
        </Heading>
        {/* <Text fontSize="sm" color="gray.500">
          Total spots: {parkingSpaces?.total}
        </Text>
        <Text fontSize="sm" color="green.500">
          Available: {parkingSpaces?.total! - reservations?.length!}
        </Text> */}
      </Flex>
      <Flex flexDir="column" gap="40px" alignItems="flex-start">
        <Filters />
        <Divider mt={0} orientation="horizontal" />

        <Suspense fallback={<Spinner />}>
          <ParkingLot searchParams={searchParams} />
        </Suspense>
      </Flex>
    </Flex>
  );
}
