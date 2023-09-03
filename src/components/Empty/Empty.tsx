import { Stack, Text } from '@/components/Chakra';
import { Clipboard } from 'react-feather';
import styles from './empty.module.scss';

function Empty() {
  return (
    <Stack className={styles.emptyContainer}>
      <Clipboard strokeWidth="1.5" />
      <Text fontWeight="medium">No data to display</Text>
    </Stack>
  );
}

export default Empty;
