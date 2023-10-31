import { Reservations } from '@prisma/client';
import { ReservationTypes } from './types';

/**
 * Handles reservations type logic -> is space reserved by current user
 * or just reserved
 * ako se prosledi samo rezervisano mesto. Onda to mesto pronaci u rezervacijama i proveriti userId trenutno ulogovanog korisnika
 * i userId rezervacije
 */
const getReservationType = (
  spotId: number,
  userId: number,
  reservations: Reservations[] | null
) => {
  const currentSpot = reservations?.find((res) => res?.spotId === spotId);

  if (currentSpot) {
    if (currentSpot?.userId === userId) {
      return ReservationTypes.ReservedByMe;
    }
    return ReservationTypes.ReservedByOther;
  }

  return ReservationTypes.NotReserved;
};

export { getReservationType };
