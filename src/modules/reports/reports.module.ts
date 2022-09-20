import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from '../../shared/entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
