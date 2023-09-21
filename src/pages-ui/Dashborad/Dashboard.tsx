import Card from '@/components/Card';
import { Flex, Heading } from '@/components/Chakra';
import SheetsPreview from './SheetsPreview';
import { getServerSession } from 'next-auth';

console.log(process.env.NEXTAUTH_SECRET);

export async function Dashboard() {
  const session = await getServerSession();

  console.log('session:', session);
  return (
    <Flex flexDir="column" rowGap="40px">
      <Flex gap="20px" justifyContent="flex-start">
        <Card
          title="Parking Spaces"
          buttonLabel="Browse"
          href="/dashboard/reserve"
        >
          Browse spaces and reserve available one
        </Card>
        <Card title="Quick Reservation" buttonLabel="Reserve now">
          Reserve the first available space automatically
        </Card>
      </Flex>
      <Flex flexDir="column" gap="20px">
        <Heading fontSize="lg">Recent Activities:</Heading>
        <SheetsPreview />
      </Flex>
    </Flex>
  );
}
