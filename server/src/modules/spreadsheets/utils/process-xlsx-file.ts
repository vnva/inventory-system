import { Workbook, Worksheet } from 'exceljs';
import { nanoid } from 'nanoid/async';
import { Readable } from 'stream';
import slugify from 'slugify';
import { BadRequestException } from '@nestjs/common';

enum SpreadsheetColumnType {
  date = 'date',
  number = 'number',
  string = 'string',
}

interface SpreadsheetColumns {
  [index: string]: {
    name: string;
    slug: string;
    type: SpreadsheetColumnType;
  };
}

interface Column {
  id: string;
  name: string;
  slug: string;
  type: SpreadsheetColumnType;
}

export const processXLSXFile = async (file: Express.Multer.File) => {
  const stream = Readable.from(file.buffer);
  const workbook = new Workbook();
  await workbook.xlsx.read(stream);
  stream.destroy();

  const worksheet = workbook.worksheets[0];

  const columnCount = worksheet.actualColumnCount;
  const firstRowCellCount = worksheet.getRow(1).actualCellCount;

  if (firstRowCellCount < columnCount) {
    worksheet.spliceRows(1, 1);
  }

  const columns = await getColumns(worksheet);
  console.log(columns);

  const rows = await getRows(worksheet, columns);
  console.log(rows);

  return { columns, rows };
};

const getColumns = async (worksheet: Worksheet): Promise<Column[]> => {
  const columns: Column[] = [];

  for (let c = 1; c <= worksheet.actualColumnCount; c++) {
    const id = await nanoid();
    const name = worksheet.getCell(1, c).value.toString();
    const slug = slugify(name, { lower: true });
    const type = getColumnType(worksheet, c);

    columns.push({
      id,
      name,
      slug,
      type,
    });
  }

  return columns;
};

const getColumnType = (worksheet: Worksheet, columnIndex: number): SpreadsheetColumnType => {
  const types = {
    2: SpreadsheetColumnType.number,
    3: SpreadsheetColumnType.string,
    4: SpreadsheetColumnType.date,
  };

  for (let r = 2; r <= worksheet.actualRowCount; r++) {
    const { type } = worksheet.getCell(r, columnIndex);
    if (type != 0) return types[type];
  }

  throw new BadRequestException('Failed to set column type');
};

const getRows = async (worksheet: Worksheet, columns: Column[]) => {
  const rows = [];

  for (let r = 2; r < worksheet.actualRowCount; r++) {
    const id = await nanoid();

    rows.push({
      id,
      hasImages: false,
      hasDocuments: false,
      values: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    for (let c = 0; c < columns.length; c++) {
      const { value } = worksheet.getCell(r, c + 1);

      if (value == undefined || value == null) {
        rows[r - 2].values[columns[c].id] = null;
        continue;
      }

      rows[r - 2].values[columns[c].id] = value;
    }
  }

  return rows;
};
