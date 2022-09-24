import { Box, Heading } from '@chakra-ui/react';
import { SpreadsheetsList } from './list';

export const SpreadsheetsPage = () => {
  return (
    <Box>
      <Heading size="lg" mb={4}>
        Таблицы
      </Heading>
      <SpreadsheetsList />
    </Box>
  );
};
