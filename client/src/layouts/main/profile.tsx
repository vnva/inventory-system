import { useAuth } from '@/hooks';
import { useAppSelector } from '@/store';
import {
  Button,
  Text,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi';

export const Profile = () => {
  const { user } = useAppSelector(state => state.auth);
  const { signout } = useAuth();

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button size="sm" leftIcon={<Icon as={FiUser} />}>
          <Text fontSize="xs" fontFamily="mono">
            {user.username}
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent maxW={200} py={1}>
        <Button
          borderRadius="none"
          justifyContent="flex-start"
          variant="ghost"
          leftIcon={<Icon as={FiSettings} />}
          size="sm"
          fontWeight="normal"
        >
          Настройки
        </Button>
        <Button
          borderRadius="none"
          justifyContent="flex-start"
          variant="ghost"
          leftIcon={<Icon as={FiLogOut} />}
          colorScheme="red"
          size="sm"
          fontWeight="normal"
          onClick={signout}
        >
          Выйти
        </Button>
      </PopoverContent>
    </Popover>
  );
};
