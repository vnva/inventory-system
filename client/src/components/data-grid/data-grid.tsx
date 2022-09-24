import { Box } from '@chakra-ui/react';
import { Column, Table, SortDirection, AutoSizer } from 'react-virtualized';

export const DataGrid = ({ spreadsheet }: { spreadsheet: any }) => {
  return (
    <Box>
      <AutoSizer>
        {({ height, width }) => (
          <Table
            width={width}
            height={height}
            headerHeight={20}
            rowHeight={30}
            rowCount={spreadsheet.rows.length}
            rowGetter={({ index }) => spreadsheet.rows[index].values}
          >
            <Column
              label="Kek"
              dataKey={spreadsheet.columns[0].id}
              width={200}
            />
          </Table>
        )}
      </AutoSizer>
    </Box>
  );
};
