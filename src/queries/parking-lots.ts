import prisma from '../../lib/prisma';

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

export { getParkingLots };
