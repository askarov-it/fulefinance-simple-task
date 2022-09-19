import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../../shared/dto/user.dto';

export class LoginResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  expiresIn: number;

  @ApiProperty()
  refreshToken?: string;

  @ApiProperty()
  profile?: UserDto;
}
