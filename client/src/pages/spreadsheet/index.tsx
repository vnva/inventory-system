import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as api from '@/api';
import { Box, Heading, Skeleton, SkeletonText, Text } from '@chakra-ui/react';
import { DataGrid } from '@/components';

export const SpreadsheetPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [spreadsheet, setSpreadsheet] = useState(null);

  useEffect(() => {
    api.spreadsheets
      .getById(id)
      .then(({ data }) => {
        setSpreadsheet(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Box mb={2}>
        <SkeletonText width={400} noOfLines={1} isLoaded={!isLoading}>
          {spreadsheet && <Heading size="lg">{spreadsheet.name}</Heading>}
        </SkeletonText>
      </Box>
      <Box mb={4}>
        <SkeletonText noOfLines={2} isLoaded={!isLoading}>
          {spreadsheet && (
            <Text fontSize="s" color="gray.500">
              {spreadsheet.description}
            </Text>
          )}
        </SkeletonText>
      </Box>
      <Skeleton height={500} isLoaded={!isLoading}>
        {spreadsheet && <DataGrid spreadsheet={spreadsheet} />}
      </Skeleton>
    </>
  );
};
