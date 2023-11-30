import { Session, getServerSession } from 'next-auth';
import prisma from '../../lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export type GetReservationsParams = {
  date?: Date | string;
};

// get reservations for current organization only
const getReservations = async ({ date }: GetReservationsParams) => {
  const where: any = {};
  const { user } = (await getServerSession(authOptions)) as Session;

  if (date) {
    where.reservedAt = date;
  }
  try {
    const reservations = await prisma.reservations.findMany({
      where: {
        ...where,
        parkingSpot: {
          parkingLot: {
            organizationId: user?.organizationId as number,
          },
        },
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
