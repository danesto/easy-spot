'use client';
import { Checkbox, Flex, Input, Select, Text } from '@/components/Chakra';
import DatePicker from 'react-date-picker';
import { ChangeEvent } from 'react';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import styles from './filters.module.scss';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { formatDate } from '@/helpers/date';
import { FilteringParams } from '@/constants/query-params';
import { ParkingLot } from '@prisma/client';

type ValuePiece = Date | null;

type DatePickerValue = ValuePiece | [ValuePiece, ValuePiece];

interface FiltersProps {
  parkingLots: ParkingLot[];
}
export function Filters({ parkingLots }: FiltersProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentDate = new Date();

  // Max date to choose
  const sevenDaysFromNow = currentDate.setDate(currentDate.getDate() + 7);

  const params = new URLSearchParams(Array.from(searchParams.entries()));

  // Handle setting params at the same place for all filters
  const handleOnDateChange = (date: DatePickerValue) => {
    if (date) {
      const formattedDate = formatDate(date.toString());

      params.set(FilteringParams.Date, `${formattedDate}`);

      const query = params.toString();

      router.push(`${pathname}?${query}`);
    }
  };

  const handleSetSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value) {
      params.set(FilteringParams.Search, e.currentTarget.value);
    } else {
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

  const handleSetAvailableOnly = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      params.set(FilteringParams.AvailableOnly, e.target.checked.toString());
    } else {
      params.delete(FilteringParams.AvailableOnly);
    }

    const query = params.toString();

    router.push(`${pathname}?${query}`);
  };

  return (
    <form>
      <Flex gap="40px" className={styles.filters}>
        <Flex flexDir="column" gap="10px">
          <Text fontSize="md" fontWeight="medium">
            Date:
          </Text>
          <DatePicker
            className={styles.datePicker}
            minDate={new Date()}
            maxDate={new Date(sevenDaysFromNow)}
            clearIcon={null}
            format="y-MM-dd"
            value={params.get(FilteringParams.Date) ?? new Date().toISOString()}
            onChange={handleOnDateChange}
          />
          <Checkbox
            justifySelf="center"
            size="md"
            mt="20px"
            borderColor="blue.500"
            padding="1"
            isChecked={
              params.get(FilteringParams.AvailableOnly) === 'true' ?? false
            }
            onChange={handleSetAvailableOnly}
          >
            Show available only
          </Checkbox>
        </Flex>

        <Flex flexDir="column" gap="10px">
          <Text fontSize="md" fontWeight="medium">
            Parking lot:
          </Text>
          <Select
            className={styles.input}
            w="180px"
            backgroundColor="#fff"
            value={params.get(FilteringParams.ParkingLot) ?? undefined}
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
            className={styles.input}
            bgColor="#fff"
            placeholder="P3"
            onChange={handleSetSearch}
          />
        </Flex>
      </Flex>
    </form>
  );
}
