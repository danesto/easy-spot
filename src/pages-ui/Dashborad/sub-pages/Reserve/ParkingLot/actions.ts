'use server';

import {
  CreateReservationParams,
  DeleteReservationParams,
  createReservation,
  deleteReservation,
} from '@/queries/reservations';
import { revalidatePath } from 'next/cache';

const submitReservation = async ({
  userId,
  spotId,
  date,
}: CreateReservationParams) => {
  try {
    const newReservation = await createReservation({ userId, spotId, date });

    revalidatePath('/dashboard/reserve');
    return newReservation;
  } catch (err) {
    console.log(err);
  }
};

const releaseReservation = async ({
  reservationId,
}: DeleteReservationParams) => {
  try {
    const deletedReservation = await deleteReservation({
      reservationId,
    });

    revalidatePath('/dashboard/reserve');
    return deletedReservation;
  } catch (err) {
    console.log(err);
  }
};

export { submitReservation, releaseReservation };
