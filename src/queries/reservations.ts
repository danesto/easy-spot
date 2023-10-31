import prisma from '../../lib/prisma';

export type GetReservationsParams = {
  date?: Date | string;
};

const getReservations = async ({ date }: GetReservationsParams) => {
  const where: any = {};

  if (date) {
    where.reservedAt = date;
  }
  try {
    const reservations = await prisma.reservations.findMany({
      where: {
        ...where,
      },
      select: {
        id: true,
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

type CreateReservationParams = {
  userId: number;
  spotId: number;
  date: string;
};
const createReservation = async ({
  date,
  userId,
  spotId,
}: CreateReservationParams) => {
  try {
    const reservations = await prisma.reservations.create({
      data: {
        userId: userId,
        spotId: spotId,
        reservedAt: date,
      },
    });
    return reservations;
  } catch (error) {
    console.log(error);
  }
};

type DeleteReservationParams = {
  reservationId: number;
};

const deleteReservation = async ({
  reservationId,
}: DeleteReservationParams) => {
  try {
    const reservations = await prisma.reservations.delete({
      where: {
        id: reservationId,
      },
    });
    return reservations;
  } catch (error) {
    console.log(error);
  }
};

export { getReservations, createReservation, deleteReservation };

export type { CreateReservationParams, DeleteReservationParams };
