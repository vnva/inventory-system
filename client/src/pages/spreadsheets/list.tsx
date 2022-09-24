import { useAppDispatch, useAppSelector } from '@/store';
import { getSpreadsheets } from '@/store/slices/spreadsheets/get-spreadsheets';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { SpreadsheetsListItem } from './list-item';

export const SpreadsheetsList = () => {
  const dispatch = useAppDispatch();
  const { spreadsheets, spreadsheetsIsLoaded, spreadsheetsIsLoading } =
    useAppSelector(state => state.spreadsheets);

  useEffect(() => {
    if (!spreadsheetsIsLoaded) dispatch(getSpreadsheets());
  }, [spreadsheetsIsLoaded]);

  return (
    <div>
      {spreadsheetsIsLoading && (
        <Flex pt={10} justifyContent="center">
          <Spinner />
        </Flex>
      )}
      {spreadsheets.map(s => (
        <Box mb={2}>
          <SpreadsheetsListItem
            id={s.id}
            name={s.name}
            hidden={s.hidden}
            description={s.description}
          />
        </Box>
      ))}
    </div>
  );
};
