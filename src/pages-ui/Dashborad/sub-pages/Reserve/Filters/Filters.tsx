'use client';
import { Checkbox, Flex, Input, Select, Text } from '@/components/Chakra';
import DatePicker from 'react-date-picker';
import { ChangeEvent, useState } from 'react';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import styles from './filters.module.scss';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { getTimestamp } from '@/helpers/date';
import { FilteringParams } from '@/constants/query-params';
import { ParkingLot } from '@prisma/client';

type ValuePiece = Date | null;

type DatePickerValue = ValuePiece | [ValuePiece, ValuePiece];

interface FiltersProps {
  parkingLots: ParkingLot[];
}
export function Filters({ parkingLots }: FiltersProps) {
  const [previewDate, setPreviewDate] = useState<
    DatePickerValue | string | undefined
  >(new Date().toISOString());
  const [q, setQ] = useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentDate = new Date();

  // Max date to choose
  const sevenDaysFromNow = currentDate.setDate(currentDate.getDate() + 7);

  const params = new URLSearchParams(Array.from(searchParams.entries()));

  // Setting date to query params needs to be handled seperately
  const handleOnDateChange = (date: DatePickerValue) => {
    const dateTest = date?.toString();

    if (date) {
      setPreviewDate(date);
      const inputDate = new Date(dateTest as string);

      // Get year, month, and day components from the parsed date
      const year = inputDate.getFullYear();
      const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1 and format as two digits
      const day = String(inputDate.getDate()).padStart(2, '0');

      // Create the output date string in 'YYYY-MM-DD' format
      const outputDateStr = `${year}-${month}-${day}`;
      params.set(FilteringParams.Date, `${outputDateStr}`);

      const query = params.toString();

      router.push(`${pathname}?${query}`);
    }
  };

  const handleSetSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value) {
      setQ(e.currentTarget.value);

      params.set(FilteringParams.Search, e.currentTarget.value);
    } else {
      setQ('');
      params.delete(FilteringParams.Search);
    }

    const query = params.toString();

    router.push(`${pathname}?${query}`);
  };

  const handleSetParkingLot = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value) {
      params.set(FilteringParams.ParkingLot, e.target.value);
    } else {
      params.delete(FilteringParams.ParkingLot);
    }

    const query = params.toString();

    router.push(`${pathname}?${query}`);
  };

  return (
    <form>
      <Flex gap="40px">
        <Flex flexDir="column" gap="10px">
          <Text fontSize="md" fontWeight="medium">
            Date:
          </Text>
          <DatePicker
            className={styles.datePicker}
            minDate={new Date()}
            maxDate={new Date(sevenDaysFromNow)}
            onChange={handleOnDateChange}
            clearIcon={null}
            format="y-MM-dd"
            value={previewDate}
          />
          <Checkbox
            justifySelf="center"
            size="md"
            mt="20px"
            borderColor="blue.500"
            padding="1"
          >
            Show available only
          </Checkbox>
        </Flex>

        <Flex flexDir="column" gap="10px">
          <Text fontSize="md" fontWeight="medium">
            Parking lot:
          </Text>
          <Select
            w="150px"
            backgroundColor="#fff"
            onChange={handleSetParkingLot}
          >
            <option value="All">All lots</option>
            {parkingLots.map((lot) => {
              return (
                <option key={lot.id} value={lot.id}>
                  {lot.name}
                </option>
              );
            })}
          </Select>
        </Flex>

        <Flex flexDir="column" gap="10px">
          <Text fontSize="md" fontWeight="medium">
            Search spaces:
          </Text>
          <Input
            bgColor="#fff"
            placeholder="P3"
            value={q}
            onChange={handleSetSearch}
          />
        </Flex>
      </Flex>
    </form>
  );
}
