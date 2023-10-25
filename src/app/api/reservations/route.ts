import { FilteringParams } from '@/constants/query-params';
import { toPrismaDate } from '@/helpers/date';
import { getReservations } from '@/queries/reservations';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const date = searchParams.get(FilteringParams.Date) ?? undefined;

  const prismaDate = toPrismaDate(date);

  const spots = await getReservations({ date: prismaDate });

  return NextResponse.json(spots);
}
