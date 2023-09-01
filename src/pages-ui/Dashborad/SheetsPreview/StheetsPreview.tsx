import {
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Link as ChakraLink,
  Badge,
} from '@/components/Chakra';
import styles from './SheetsPreview.module.scss';
import Link from 'next/link';

export function SheetsPreview() {
  return (
    <Table
      variant="striped"
      size="md"
      className={styles.table}
      borderRadius="sm"
    >
      <Thead bgColor="blue.800">
        <Tr>
          <Th>User</Th>
          <Th>Action Type</Th>
          <Th>Parking space</Th>
          <Th>Date & time</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>
            <ChakraLink as={Link} color="blue.700" fontWeight="medium" href="/">
              Jon Doe
            </ChakraLink>
          </Td>
          <Td>
            <Badge variant="solid" bgColor="green.400">
              Reserved
            </Badge>
          </Td>
          <Td>P3</Td>
          <Td>25.07.2023</Td>
          <Td>Edit / Delete</Td>
        </Tr>
        <Tr>
          <Td>Jon Doe</Td>
          <Td>
            <Badge variant="solid" bgColor="green.400">
              Reserved
            </Badge>
          </Td>
          <Td>5</Td>
          <Td>5</Td>
          <Td>Edit / Delete</Td>
        </Tr>
        <Tr>
          <Td>Jon Doe</Td>
          <Td>
            <Badge variant="solid" bgColor="red.400">
              Released
            </Badge>
          </Td>
          <Td>5</Td>
          <Td>5</Td>
          <Td>Edit / Delete</Td>
        </Tr>
        <Tr>
          <Td>Travel</Td>
          <Td>25.07.2023</Td>
          <Td>5</Td>
          <Td>5</Td>
          <Td>Edit / Delete</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Td colSpan={5} textAlign="right">
            <ChakraLink color="blue.700" as={Link} href="/sheets">
              View all
            </ChakraLink>
          </Td>
        </Tr>
      </Tfoot>
    </Table>
  );
}
