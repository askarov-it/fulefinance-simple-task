import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import { ListTablesEnum } from '../config/enums'
import { UserEntity } from './user.entity'

@Entity(ListTablesEnum.REFRESH_TOKENS)
export class RefreshToken {
  @PrimaryColumn()
  value: string

  @Column({
    type: 'bigint',
  })
  expiresAt: number

  @Column({
    type: 'bigint',
  })
  createdAt: number

  @Column({
    type: 'bigint',
  })
  updatedAt: number

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: 'userId',
  })
  user: UserEntity

  userId: string
}
