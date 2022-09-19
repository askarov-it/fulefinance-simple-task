import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { RefreshToken } from '../../../shared/entities/refresh-token.entity';
import { randomBytes, randomUUID } from 'crypto';
import { JwtPayload } from '../types/jwt-payload';
import { LoginResponseDto } from '../dto/login.response.dto';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name)

  private readonly jwtOptions: SignOptions = {};
  private readonly jwtKey: string = process.env.ACCESS_TOKEN_KEY;
  private readonly expiresInDefault: number = parseInt(process.env.ACCESS_TOKEN_TTL, 10);
  private readonly refreshTokenTTL: number = parseInt(process.env.REFRESH_TOKEN_TTL, 10);

  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>
  ) {}

  async createAccessToken(
    payload: JwtPayload,
    expires?: number,
  ): Promise<LoginResponseDto> {
    const options = this.jwtOptions;

    options.expiresIn = expires || this.expiresInDefault;
    options.jwtid = randomUUID();

    const signedPayload = sign(payload, this.jwtKey, options);

    return {
      accessToken: signedPayload,
      expiresIn: expires,
    }
  }

  async createRefreshToken(payload: JwtPayload): Promise<string> {
    const token = new RefreshToken();

    const refreshToken = randomBytes(64).toString('hex');
    token.value = refreshToken;
    token.userId = payload.sub;

    const date = new Date();

    token.createdAt = new Date(date.toUTCString()).getTime();
    token.updatedAt = new Date(date.toUTCString()).getTime();
    token.expiresAt = new Date(date.toUTCString()).getTime() + this.refreshTokenTTL;

    await this.refreshTokenRepository.save(token)

    return refreshToken
  }

  async getAccessTokenFromRefreshToken(
    refreshToken: string,
    oldAccessToken: string,
  ): Promise<LoginResponseDto> {
    try {
      const token = await this.refreshTokenRepository.findOne({
        where: {
          value: refreshToken
        },
      })

      if (!token) {
        throw new HttpException(
          'Refresh token not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        )
      }

      const date = new Date();
      const currentDate  = new Date(date.toUTCString()).getTime();

      if (token.expiresAt < currentDate) {
        throw new HttpException('Refresh token expired', HttpStatus.FORBIDDEN)
      }

      /**
      * Refresh token is still valid
      * Generate new access token
      */
      const oldPayload = await this.validateToken(oldAccessToken, true)
      const payload = {
        sub: oldPayload.sub,
      }

      const accessToken = await this.createAccessToken(payload)

      await this.refreshTokenRepository.delete({ value: token.value })
      accessToken.refreshToken = await this.createRefreshToken(oldPayload)

      return accessToken
    } catch (error) {
      this.logger.error(error.message)
      throw error
    }
  }

  private async validateToken(
    token: string,
    ignoreExpiration = false,
  ): Promise<JwtPayload> {
    return verify(token, this.jwtKey, { ignoreExpiration });
  }
}
