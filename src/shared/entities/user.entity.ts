import { BeforeInsert, Column, Entity } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import { ListTablesEnum } from '../config/enums';
import { BaseEntity } from './base-entity';

@Entity({ name: ListTablesEnum.USERS })
export class UserEntity extends BaseEntity {
  @Column('varchar', {
    length: 150,
    nullable: false,
    unique: true,
  })
  email: string

  @Column({
    nullable: false,
    select: false,
  })
  password: string;

  @BeforeInsert()
  async encodePassword(): Promise<void> {
    const salt = await genSalt(12);
    this.password = await hash(this.password, salt);
  }
}
