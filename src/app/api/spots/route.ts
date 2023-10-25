import { FilteringParams } from '@/constants/query-params';
import { getTotalParkingSpotsByLot } from '@/queries/parking-lot';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const parkingLotId = searchParams.get(FilteringParams.ParkingLot)
    ? parseInt(searchParams.get(FilteringParams.ParkingLot) as string)
    : undefined;

  const search = searchParams.get(FilteringParams.Search);

  const spots = await getTotalParkingSpotsByLot({
    parkingLotId: parkingLotId,
    search: search || undefined,
  });

  return NextResponse.json(spots);
}
