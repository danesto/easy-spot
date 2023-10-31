import { FilteringParams } from '@/constants/query-params';
import { getReservations } from '@/queries/reservations';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const date = searchParams.get(FilteringParams.Date) ?? undefined;

  const spots = await getReservations({ date: date });

  return NextResponse.json(spots);
}
