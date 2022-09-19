import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as pgConfig from '../db/pg';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ParserModule } from './modules/parser/parser.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(pgConfig),
    AuthModule,
    UsersModule,
    ParserModule,
    TransactionsModule,
  ],
})
export class AppModule {}
