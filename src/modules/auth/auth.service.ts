import { Injectable, UnauthorizedException, NotFoundException, ConflictException } from '@nestjs/common';
import { compareSync } from 'bcryptjs'

import { JwtPayload } from './types/jwt-payload';
import { TokenService } from './token/token.service';
import { UserEntity } from '../../shared/entities/user.entity';
import { LoginResponseDto } from './dto/login.response.dto';
import { LoginRequestDto } from './dto/login.request.dto';
import { RegistrationRequestDto } from './dto/registration.dto';
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {

  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
  ) {}

  async registration(data: RegistrationRequestDto): Promise<Omit<UserEntity, 'password'>> {
    const existUser = await this.usersService.findOne({
      where: {
        email: data.email,
      },
      select: ['id']
    });

    if (existUser) {
      throw new ConflictException('The user already registered');
    }
    const newUser: UserEntity = await this.usersService.save(data);

    delete newUser.password;
    return newUser;
  }

  async login(data: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findOne(
      {
        where: {
          email: data.email,
        },
        select: [
          'id',
          'password',
          'email',
        ],
      },
    );

    if (!user) {
      throw new NotFoundException('The user not found');
    }

    if (!compareSync(data.password, user.password)) {
      throw new UnauthorizedException('The user credentials were incorrect');
    }

    const payload: JwtPayload = {
      sub: user.id,
    }
    const loginResponse = await this.tokenService.createAccessToken(payload);
    const refresh = await this.tokenService.createRefreshToken(payload);
    delete user.password;

    return {
      ...loginResponse,
      profile: user,
      refreshToken: refresh,
    }
  }
}
