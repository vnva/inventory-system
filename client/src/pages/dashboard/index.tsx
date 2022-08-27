import { useAppSelector } from '@/store';
import { getDayPeriod } from '@/utils';
import { Box, Heading, Text } from '@chakra-ui/react';

const DashboardPage = () => {
  const period = getDayPeriod();
  const { username } = useAppSelector(state => state.auth.user);

  return (
    <Box>
      <Heading size="lg">
        {period},{' '}
        <Text as="span" fontFamily="mono">
          {username}
        </Text>
      </Heading>
    </Box>
  );
};

export default DashboardPage;
