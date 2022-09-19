import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from '../../shared/entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
  ],
  providers: [TransactionsService],
  exports: [TransactionsService]
})
export class TransactionsModule {}
