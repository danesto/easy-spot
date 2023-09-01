'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  Input,
  Text,
} from '@chakra-ui/react';

function LoginPage() {
  return (
    <Card size="md" w="400px" borderRadius="md">
      <CardHeader
        bgColor="teal.700"
        borderTopLeftRadius="md"
        borderTopRightRadius="md"
      >
        <Text color="white" fontWeight="bold">
          Prijava
        </Text>
      </CardHeader>
      <CardBody display="flex" flexDirection="column" gap="20px">
        <FormControl display="flex" flexDir="column" gap="10px">
          <Text fontSize="sm" fontWeight="bold">
            E-mail
          </Text>
          <Input size="md" id="email" placeholder="primer@domen.com" />
        </FormControl>
        <FormControl display="flex" flexDir="column" gap="10px">
          <Text fontSize="sm" fontWeight="bold">
            Lozinka
          </Text>
          <Input size="md" id="email" placeholder="*********" type="password" />
        </FormControl>
      </CardBody>
      <CardFooter>
        <Button m="auto" w="100%">
          Prijavi se
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LoginPage;
