import { Flex, Heading, Tooltip, Text } from '@/components/Chakra';
import { Info } from 'react-feather';
import styles from '../settings.module.scss';

interface SettingsSectionProps {
  title: string;
  subtitle?: string;
  tooltipContent?: string | React.ReactNode;
  children: JSX.Element | JSX.Element[];
}

function SettingsSection({
  title,
  subtitle,
  tooltipContent,
  children,
}: SettingsSectionProps) {
  return (
    <Flex className={styles.settingsBox} flexDirection="column">
      <Heading fontSize="xl" fontWeight="semibold">
        {title}
        {!!tooltipContent && (
          <Tooltip label={tooltipContent}>
            <Info size="15px" color="var(--chakra-colors-gray-500)" />
          </Tooltip>
        )}
      </Heading>
      {!!subtitle && (
        <Text className={styles.description} fontSize="md">
          {subtitle}
        </Text>
      )}
      {children}
    </Flex>
  );
}

export default SettingsSection;
