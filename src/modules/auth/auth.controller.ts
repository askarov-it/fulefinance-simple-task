import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenService } from './token/token.service';
import {
  UnauthorizedError,
  BadRequestError,
  InternalServerError,
} from '../../shared/dto/errors';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { RegistrationRequestDto } from './dto/registration.dto';
import { UserEntity } from '../../shared/entities/user.entity';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
  ) {}

  @ApiOperation({ description: 'Login for user' })
  @ApiUnauthorizedResponse({ type: UnauthorizedError })
  @ApiBadRequestResponse({ type: BadRequestError })
  @ApiInternalServerErrorResponse({ type: InternalServerError })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() data: LoginRequestDto): Promise<LoginResponseDto> {
    return this.service.login(data)
  }

  @ApiOperation({ description: 'Registration a new user' })
  @ApiUnauthorizedResponse({ type: UnauthorizedError })
  @ApiBadRequestResponse({ type: BadRequestError })
  @ApiInternalServerErrorResponse({ type: InternalServerError })
  @Post('registration')
  @HttpCode(HttpStatus.OK)
  registration(@Body() data: RegistrationRequestDto): Promise<Omit<UserEntity, 'password'>> {
    return this.service.registration(data)
  }
}
