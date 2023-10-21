import ReservePage from '@/pages-ui/Dashborad/sub-pages/Reserve';

async function Reserve({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <ReservePage searchParams={searchParams} />;
}

export default Reserve;
