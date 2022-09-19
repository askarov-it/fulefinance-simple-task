import { Injectable } from '@nestjs/common';
import { CsvParser, ParsedData } from 'nest-csv-parser';
import { createReadStream } from 'fs';
import { TransactionDto } from '../../shared/dto/transaction.dto';

@Injectable()
export class ParserService {
  constructor(
    private readonly csvParser: CsvParser
  ) {}

  async parseCSV(path: string): Promise<ParsedData<TransactionDto>> {
    const data = createReadStream(path);
    return this.csvParser.parse(data, TransactionDto);
  }
}
