import { Injectable, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { ImportSpreadsheetDTO } from './dto';
import { processXLSXFile } from './utils';

@Injectable()
export class SpreadsheetsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async getSpreadsheets() {
    return await this.knex('spreadsheets').select(['id', 'name', 'description', 'hidden']);
  }

  async getSpreadsheet(id) {
    const result = await this.knex('spreadsheets').first('*').where({ id });

    if (!result) throw new NotFoundException();

    return result;
  }

  async importSpreadsheet(dto: ImportSpreadsheetDTO, file: Express.Multer.File) {
    const { columns, rows } = await processXLSXFile(file);

    const result = await this.knex('spreadsheets').insert(
      {
        name: dto.name,
        description: dto.description,
        columns: JSON.stringify(columns),
        rows: JSON.stringify(rows),
      },
      '*',
    );

    return result;
  }

  async getRowById(sheetId: string, rowId: string) {
    const result = await this.knex('spreadsheets').first('rows').where({ id: sheetId });

    console.log(result.rows.filter);

    return result.rows;
  }
}
