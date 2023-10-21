'use client';
import { Checkbox, Flex, Input, Select, Text } from '@/components/Chakra';
import DatePicker from 'react-date-picker';
import { useState } from 'react';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import styles from './filters.module.scss';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { getTimestamp } from '@/helpers/date';
import { FilteringParams } from '@/constants/query-params';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { revalidatePath } from 'next/cache';

type ValuePiece = Date | null;

type DatePickerValue = ValuePiece | [ValuePiece, ValuePiece];

export function Filters() {
  const [previewDate, setPreviewDate] = useState<DatePickerValue | undefined>(
    new Date()
  );
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { pending } = useFormStatus();

  const currentDate = new Date();

  // Max date to choose
  const sevenDaysFromNow = currentDate.setDate(currentDate.getDate() + 7);

  const params = new URLSearchParams(Array.from(searchParams.entries()));

  const { register, handleSubmit } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  // Setting date to query params needs to be handled seperately
  const handleOnDateChange = (date: DatePickerValue) => {
    if (date) {
      setPreviewDate(date);

      const timestamp = getTimestamp(date as Date);
      params.set(FilteringParams.Date, `${timestamp}`);

      const query = params.toString();

      router.push(`${pathname}?${query}`);
    }
  };

  const handleFormSubmit = (formData: any) => {
    const parkingLotId = formData?.parkingLot;
    const search = formData?.search;

    if (parkingLotId) {
      params.set(FilteringParams.ParkingLot, parkingLotId);
    }

    if (search) {
      params.set(FilteringParams.Search, search);
    } else {
      params.delete(FilteringParams.Search);
    }

    const query = params.toString();

    router.push(`${pathname}?${query}`);
  };

  return (
    <form onChange={handleSubmit(handleFormSubmit)}>
      {pending && 'LOADING'}
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
          <Select w="150px" backgroundColor="#fff" {...register('parkingLot')}>
            <option value="All">All</option>
            <option value="1">Garage</option>
            <option value="2">Outside</option>
          </Select>
        </Flex>

        <Flex flexDir="column" gap="10px">
          <Text fontSize="md" fontWeight="medium">
            Search spaces:
          </Text>
          <Input bgColor="#fff" placeholder="P3" {...register('search')} />
        </Flex>
      </Flex>
    </form>
  );
}
