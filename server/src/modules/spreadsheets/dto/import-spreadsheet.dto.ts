import { IsString } from 'class-validator';

export class ImportSpreadsheetDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
