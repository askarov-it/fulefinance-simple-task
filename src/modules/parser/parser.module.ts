import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser'
import { ParserController } from './parser.controller';
import { ParserService } from './parser.service';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [CsvModule, TransactionsModule],
  controllers: [ParserController],
  providers: [ParserService]
})
export class ParserModule {}
