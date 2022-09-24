import { siteMap } from '@/consts';
import { useAppSelector } from '@/store';
import {
  Box,
  Container,
  Flex,
  Icon,
  IconButton,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

import { Profile } from './profile';

export const MainLayoutHeader: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { userIsLoaded } = useAppSelector(state => state.auth);

  const toggleButtonColorScheme = useColorModeValue('gray', 'yellow');

  return (
    <Box py={5} mb={2}>
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        maxW="container.xl"
      >
        <Text fontWeight="bold" fontSize="lg">
          Инвентаризация
        </Text>
        <Flex alignItems="center">
          <Link
            as={RouterLink}
            to={siteMap.dashboard.path}
            fontSize="sm"
            mr={4}
          >
            Главная
          </Link>
          <Link
            as={RouterLink}
            to={siteMap.spreadsheets.path}
            fontSize="sm"
            mr={4}
          >
            Таблицы
          </Link>
          <Link
            as={RouterLink}
            to={siteMap.dashboard.path}
            fontSize="sm"
            mr={4}
          >
            Пользователи
          </Link>
          <Link as={RouterLink} to={siteMap.docs.path} fontSize="sm" mr={4}>
            Документация
          </Link>
          <IconButton
            size="sm"
            mr={2}
            onClick={toggleColorMode}
            aria-label="Change theme"
            colorScheme={toggleButtonColorScheme}
            icon={<Icon as={colorMode === 'light' ? FiMoon : FiSun} />}
          />
          {userIsLoaded && <Profile />}
        </Flex>
      </Container>
    </Box>
  );
};
