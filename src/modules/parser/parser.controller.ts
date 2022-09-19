import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequestError, InternalServerError, UnauthorizedError } from '../../shared/dto/errors';
import { ParserService } from './parser.service';
import { TransactionsService } from '../transactions/transactions.service';
import { AdapterCSVData } from './utils/convertData';

@ApiTags('CSV')
@Controller('csv')
export class ParserController {
  constructor(
    private readonly service: ParserService,
    private readonly transactionService: TransactionsService,
  ) {}

  @ApiOperation({ description: 'Load csv file to database' })
  @ApiUnauthorizedResponse({ type: UnauthorizedError })
  @ApiBadRequestResponse({ type: BadRequestError })
  @ApiInternalServerErrorResponse({ type: InternalServerError })
  @Post('load')
  @HttpCode(HttpStatus.OK)
  async loadCsv(): Promise<void> {
     const data = await this.service.parseCSV('/app/dist/input.csv');

     const adapter = new AdapterCSVData(data.list);
     const transactions = adapter.convertToJSON().getResults();

     await this.transactionService.saveBatch(transactions);
  }
}
