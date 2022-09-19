import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../../shared/entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionDto } from '../../shared/dto/transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepo: Repository<TransactionEntity>
  ) {}

  async saveBatch(body: TransactionDto[]): Promise<TransactionEntity[]> {
    return this.transactionRepo.save(body);
  }
}
