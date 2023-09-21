'use server';

import { revalidatePath } from 'next/cache';

async function getParkingLots() {
  // try {
  //   await getParkingLots();
  // } catch (e) {
  //   console.log(e);
  // }

  revalidatePath('dashboard/parking-lots');
}

export { getParkingLots };
