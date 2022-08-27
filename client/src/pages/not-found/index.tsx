import { Flex, Heading } from '@chakra-ui/react';

export const NotFoundPage: React.FC = () => {
  return (
    <Flex h="98vh" w="100vw" justifyContent="center" alignItems="center">
      <Heading mr="1rem">404 - Страница не найдена</Heading>
    </Flex>
  );
};
