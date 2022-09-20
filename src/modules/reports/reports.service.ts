import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from '../../shared/entities/transaction.entity';
import { Repository } from 'typeorm';
import { ReportQueryDto, ReportResponseDto } from './dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepo: Repository<TransactionEntity>
  ) {}

  async report(query: ReportQueryDto): Promise<ReportResponseDto> {
    const { date } = query;

    return this.transactionRepo.query(`
        SELECT
          T.source,
          json_build_object(
              'total', to_json(SUM(T.sum)),
              'date', to_json(to_char(T."date"::date, 'MM-YYYY'))
          ) as data
        FROM transactions as T
        ${!!date ? `WHERE T.date = '${date}'` : ''}
        GROUP BY T."date", T.source
        ORDER BY T.date::date DESC  
    `);
  }
}
