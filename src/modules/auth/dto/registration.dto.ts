import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class RegistrationRequestDto {
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
