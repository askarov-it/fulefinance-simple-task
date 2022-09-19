import { Injectable } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { UserEntity } from '../../shared/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}

  async findOne(options: FindOneOptions): Promise<UserEntity> {
    return this.userRepo.findOne(options);
  }

  async save(body: Partial<UserEntity>): Promise<UserEntity> {
    return this.userRepo.save(this.userRepo.create(body));
  }
}
