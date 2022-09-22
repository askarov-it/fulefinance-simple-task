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
      WITH agg_transaction as (
          SELECT sum(sum), source, date
          FROM transactions
          GROUP BY source, date
      )
      SELECT
          T.source,
          json_agg(
              json_build_object(
                  'total', to_json(T.sum),
                  'date', to_json(to_char(T."date"::date, 'MM-YYYY'))
              )
          ) as data
      FROM agg_transaction as T
      ${!!date ? `WHERE T.date = '${date}'` : ''}  
      GROUP BY T.source
      ORDER BY T.source DESC
    `);
  }
}
