import { GetTotalParkingSpotsByLotParams } from '@/queries/parking-lot';
import { GetReservationsParams } from '@/queries/reservations';

const getSpots = async ({
  parkingLotId,
  search,
  availableOnly,
}: GetTotalParkingSpotsByLotParams) => {
  try {
    const res = await fetch(
      `/api/spots?lot=${parkingLotId || ''}&q=${
        search || ''
      }&free=${availableOnly}`
    );

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const getReservations = async ({ date }: GetReservationsParams) => {
  try {
    const res = await fetch(`/api/reservations?date=${date || ''}`);

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { getSpots, getReservations };
