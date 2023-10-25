import prisma from '@/../lib/prisma';
import { ParkingLot, ParkingSpot } from '@prisma/client';
import { FilteringParams } from './types';

type GetParkingLots = {
  userId: number;
};

// todo: get userId from localStorage token (or session?)
const getParkingLots = async ({ userId }: GetParkingLots) => {
  try {
    const parkingLots = await prisma.parkingLot.findMany({
      where: {
        users: {
          some: {
            userId: userId,
          },
        },
      },
    });

    return parkingLots;
  } catch (error) {
    console.log(error);
  }
};

const createParkingLot = async ({
  name,
  numberOfSpots,
  prefix,
}: Omit<ParkingLot, 'id'>) => {
  try {
    // create new lot
    const newParkingLot = await prisma.parkingLot.create({
      data: {
        name: name,
        numberOfSpots,
        prefix,
      },
    });

    // and populate many to many relation table as well
    // for corresponding user
    await prisma.parkingLotsOfUsers.create({
      data: {
        // todo: replace userId with user id from active session
        userId: 1,
        parkingLotId: newParkingLot.id,
      },
    });

    const spotsToAdd: Omit<ParkingSpot, 'id'>[] = Array(numberOfSpots)
      .fill(numberOfSpots)
      .map((_value, key) => {
        return {
          name: `${prefix}${key + 1}`,
          parkingLotId: newParkingLot.id,
          prefix: prefix,
          isReserved: false,
        };
      });

    console.log(spotsToAdd);

    await prisma.parkingSpot.createMany({
      data: spotsToAdd,
    });

    console.log('created: ', newParkingLot);
  } catch (error) {
    console.log(error);
  }
};

export type GetTotalParkingSpotsByLotParams = {
  parkingLotId?: number;
  search?: string;
};

const getTotalParkingSpotsByLot = async ({
  parkingLotId,
  search,
}: GetTotalParkingSpotsByLotParams) => {
  const parkingLotFilter: FilteringParams = {};

  if (parkingLotId) {
    parkingLotFilter.id = parkingLotId;
  }

  try {
    const totalSum = await prisma.parkingLot.aggregate({
      where: {
        users: { some: { userId: 1 } },
      },
      _sum: {
        numberOfSpots: true,
      },
    });

    const spots = await prisma.parkingSpot.findMany({
      where: {
        name: {
          contains: search || '',
          mode: 'insensitive',
        },
        parkingLot: {
          ...parkingLotFilter,
          users: {
            some: {
              userId: 1,
            },
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
      include: {
        parkingLot: {
          select: {
            name: true,
            users: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });

    return { total: totalSum._sum.numberOfSpots, spots };
  } catch (error: unknown) {
    console.log(error);
  }
};

export { getParkingLots, createParkingLot, getTotalParkingSpotsByLot };
