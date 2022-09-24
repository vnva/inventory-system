import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportSpreadsheetDTO } from './dto';
import { SpreadsheetsService } from './spreadsheets.service';

@Controller('spreadsheets')
export class SpreadsheetsController {
  constructor(private spreadsheetsService: SpreadsheetsService) {}

  @Get()
  getSpreadsheets() {
    return this.spreadsheetsService.getSpreadsheets();
  }

  @Get(':id')
  getSpreadsheet(@Param('id') id: string) {
    return this.spreadsheetsService.getSpreadsheet(id);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  importSpreadsheet(@Body() dto: ImportSpreadsheetDTO, @UploadedFile() file: Express.Multer.File) {
    return this.spreadsheetsService.importSpreadsheet(dto, file);
  }

  @Get(':sheetId/rows/:rowId')
  getRowById(@Param('sheetId') sheetId: string, @Param('rowId') rowId: string) {
    return this.spreadsheetsService.getRowById(sheetId, rowId);
  }
}
