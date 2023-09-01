'use client';
import { Checkbox, Flex, Input, Select, Text } from '@/components/Chakra';
import DatePicker from 'react-date-picker';
import { useState } from 'react';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import styles from './filters.module.scss';

type ValuePiece = Date | null;

type DatePickerValue = ValuePiece | [ValuePiece, ValuePiece];

export function Filters() {
  const [previewDate, setPreviewDate] = useState<DatePickerValue>(new Date());

  return (
    <Flex gap="40px">
      <Flex flexDir="column" gap="10px">
        <Text fontSize="md" fontWeight="medium">
          Date:
        </Text>
        <DatePicker
          className={styles.datePicker}
          onChange={setPreviewDate}
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
        <Select w="150px" backgroundColor="#fff">
          <option value="All">All</option>
          <option value="Garage">Garage</option>
          <option value="Outside">Outside</option>
        </Select>
      </Flex>

      <Flex flexDir="column" gap="10px">
        <Text fontSize="md" fontWeight="medium">
          Search spaces:
        </Text>
        <Input bgColor="#fff" placeholder="P3" />
      </Flex>
    </Flex>
  );
}
