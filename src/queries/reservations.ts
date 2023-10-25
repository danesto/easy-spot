import prisma from '../../lib/prisma';

export type GetReservationsParams = {
  date?: Date | string;
};

const getReservations = async ({ date }: GetReservationsParams) => {
  const where: any = {};

  if (date) {
    where.createdAt = {
      gt: date,
    };
  }
  try {
    const reservations = await prisma.reservations.findMany({
      where: {
        ...where,
      },
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
