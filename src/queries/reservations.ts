import prisma from '../../lib/prisma';

const getReservations = async () => {
  try {
    const reservations = await prisma.reservations.findMany({
      select: {
        spotId: true,
        userId: true,
        createdAt: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return reservations;
  } catch (error) {
    console.log(error);
  }
};

type AddReservationParams = {
  userId: number;
  spotId: number;
};
const addReservation = async ({ userId, spotId }: AddReservationParams) => {
  try {
    const reservations = await prisma.reservations.create({
      data: {
        userId: userId,
        spotId: spotId,
      },
    });
    return reservations;
  } catch (error) {
    console.log(error);
  }
};

type DeleteReservationParams = {
  spotId: number;
  userId: number;
};

const deleteReservation = async ({
  spotId,
  userId,
}: DeleteReservationParams) => {
  try {
    const reservations = await prisma.reservations.delete({
      where: {
        userId_spotId: {
          spotId: spotId,
          userId: userId,
        },
      },
    });
    return reservations;
  } catch (error) {
    console.log(error);
  }
};

export { getReservations, addReservation, deleteReservation };

export type { AddReservationParams, DeleteReservationParams };
