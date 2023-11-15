'use client';

import {
  Button,
  Card as ChakraCard,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
} from '@/components/Chakra';
import Link from 'next/link';

interface CardProps {
  title: string | React.ReactNode;
  children: string | React.ReactNode;
  footer?: string | React.ReactNode;
  href?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export function Card({
  title,
  children,
  footer,
  buttonLabel = `Create ${title}`,
  href,
  onButtonClick = () => null,
}: CardProps) {
  return (
    <ChakraCard
      maxW="300px"
      boxShadow="unset"
      border="1px"
      borderColor="gray.400"
      borderRadius="sm"
      _hover={{ borderColor: '#2b4365' }}
    >
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>{children}</CardBody>
      <CardFooter>
        {footer}

        {href ? (
          <Button as={Link} href={href} borderRadius="sm">
            {buttonLabel}
          </Button>
        ) : (
          <Button onClick={onButtonClick} borderRadius="sm">
            {buttonLabel}
          </Button>
        )}
      </CardFooter>
    </ChakraCard>
  );
}
