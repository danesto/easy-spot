import prisma from '@/../lib/prisma';
import { ParkingLot, ParkingSpot } from '@prisma/client';
import { FilteringParams } from './types';
import { getReservations } from './reservations';
import { toPrismaDate } from '@/helpers/date';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

type GetParkingLots = {
  userId: number;
};

// todo: get userId from localStorage token (or session?)
const getParkingLots = async ({ userId }: GetParkingLots) => {
  const { user } = (await getServerSession(authOptions)) as Session;

  try {
    const parkingLots = await prisma.parkingLot.findMany({
      where: {
        organization: {
          id: user?.organizationId,
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
  const { user } = (await getServerSession(authOptions)) as Session;

  try {
    // create new lot
    const newParkingLot = await prisma.parkingLot.create({
      data: {
        name: name,
        numberOfSpots,
        prefix,
        organizationId: user?.organizationId as number,
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
  availableOnly?: boolean;
};

const getTotalParkingSpotsByLot = async ({
  parkingLotId,
  search,
  availableOnly,
}: GetTotalParkingSpotsByLotParams) => {
  const { user } = (await getServerSession(authOptions)) as Session;

  const parkingLotFilter: FilteringParams = {};
  const spotFilter: { id: { notIn: number[] } } = { id: { notIn: [] } };

  if (parkingLotId) {
    parkingLotFilter.id = parkingLotId;
  }

  try {
    const totalSum = await prisma.parkingLot.aggregate({
      where: {
        organization: {
          id: user?.organizationId as number,
        },
      },
      _sum: {
        numberOfSpots: true,
      },
    });

    if (availableOnly) {
      // get reservations for current organization only
      const reservations = await getReservations({ date: toPrismaDate() });

      spotFilter.id.notIn =
        (reservations?.map((res) => res.spotId) as number[]) || [];
    } else {
      spotFilter.id.notIn = [];
    }

    const spots = await prisma.parkingSpot.findMany({
      where: {
        name: {
          contains: search || '',
          mode: 'insensitive',
        },
        ...spotFilter,
        parkingLot: {
          ...parkingLotFilter,
          organization: {
            id: user?.organizationId as number,
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
