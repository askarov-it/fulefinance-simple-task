import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    required: true,
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @ApiProperty({
    minLength: 7,
    required: true,
    description: 'Password should include letters and numbers (In process)',
  })
  password: string
}

export class RefreshTokenRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    minLength: 1,
    required: true,
    description: 'Refresh token',
  })
  refresh: string
}
