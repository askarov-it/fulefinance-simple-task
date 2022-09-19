import { UserEntity } from '../entities/user.entity';
import { BaseDto } from './base.dto';

export class UserDto extends BaseDto implements
    Omit<
      UserEntity,
      | 'encodePassword'
      | 'password'
    >
{
  readonly email: string;
}
