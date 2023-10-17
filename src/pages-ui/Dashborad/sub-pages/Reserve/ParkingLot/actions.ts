'use server';

import {
  AddReservationParams,
  DeleteReservationParams,
  addReservation,
  deleteReservation,
} from '@/queries/reservations';
import { revalidatePath } from 'next/cache';

const submitReservation = async ({ userId, spotId }: AddReservationParams) => {
  try {
    const newReservation = await addReservation({ userId, spotId });

    revalidatePath('/dashboard/reserve');
    return newReservation;
  } catch (err) {
    console.log(err);
  }
};

const releaseReservation = async ({
  userId,
  spotId,
}: DeleteReservationParams) => {
  try {
    const deletedReservation = await deleteReservation({ userId, spotId });

    revalidatePath('/dashboard/reserve');
    return deletedReservation;
  } catch (err) {
    console.log(err);
  }
};

export { submitReservation, releaseReservation };

// add release action
