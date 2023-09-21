'use server';

import { createParkingLot } from '@/queries/parking-lot';
import { revalidatePath } from 'next/cache';

export async function create(formData: FormData) {
  try {
    formData.forEach((item) => console.log(item));

    const newParkingLot = {
      name: formData.get('name') as string,
      numberOfSpots: parseInt(formData.get('number_of_spaces') as string),
      prefix: formData.get('prefix') as string,
    };

    await createParkingLot({ ...newParkingLot });
    // formData.map((item) => console.log(item));
    // const mappedData = formData?.map(item => {
    //   item.name: item.values
    // })
    revalidatePath('/dashboard/parking-lots');
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}
