import { Controller, HttpCode, HttpStatus, Post, Logger } from '@nestjs/common';
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
import { AdapterCSVData, ADAPTER_TYPE_VERIFY } from './utils/convertData';

@ApiTags('CSV')
@Controller('csv')
export class ParserController {
  private readonly logger = new Logger(ParserService.name);

  constructor(
    private readonly service: ParserService,
    private readonly transactionService: TransactionsService,
  ) {}

  @ApiOperation({ description: 'Load csv file to database' })
  @ApiUnauthorizedResponse({ type: UnauthorizedError })
  @ApiBadRequestResponse({ type: BadRequestError })
  @ApiInternalServerErrorResponse({ type: InternalServerError })
  @Post('load')
  @HttpCode(HttpStatus.CREATED)
  async loadCsv(): Promise<void> {
     const data = await this.service.parseCSV('/app/dist/input.csv');

     // TODO need to create another layer for the adapter
     const adapter = new AdapterCSVData(data.list);
     const transactions = adapter
       .convertToJSON()
       .verify('date', ADAPTER_TYPE_VERIFY.DATE)
       .getResults();

     if (adapter.getInvalidData().length > 0) {
       this.logger.warn(`[INVALID DATA] ${JSON.stringify(adapter.getInvalidData())}`)
     }

     await this.transactionService.saveBatch(transactions);
  }
}
