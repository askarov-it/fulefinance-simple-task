import { Column, Entity } from 'typeorm';
import { ListTablesEnum } from '../config/enums';
import { BaseEntity } from './base-entity';

@Entity({ name: ListTablesEnum.TRANSACTIONS })
export class TransactionEntity extends BaseEntity {
  @Column()
  date: string;

  @Column({
    nullable: true,
  })
  sum: number;

  @Column('enum', {
    enum: ['income', 'custom-source', 'other'],
    nullable: false,
  })
  source: string;

  @Column('varchar', {
    length: 248,
  })
  description: string;
}
