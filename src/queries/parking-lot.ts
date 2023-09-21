import prisma from '@/../lib/prisma';
import { ParkingLot } from '@prisma/client';

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
    const newParkingLot = await prisma.parkingLot.create({
      data: {
        name: name,
        numberOfSpots,
        prefix,
      },
    });

    // populate many to many relation table as well
    await prisma.parkingLotsOfUsers.create({
      data: {
        // todo: replace userId with user id from active session
        userId: 1,
        parkingLotId: newParkingLot.id,
      },
    });

    console.log('created: ', newParkingLot);
  } catch (error) {
    console.log(error);
  }
};

export { getParkingLots, createParkingLot };
