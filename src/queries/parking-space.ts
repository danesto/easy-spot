import prisma from '@/../lib/prisma';

const getParkingSpaces = async () => {
  try {
    const spaces = await prisma.parkingLot.findMany();
    return spaces;
  } catch (e) {
    console.log(e);
  }
};

export { getParkingSpaces };
