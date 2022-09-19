import { ApiProperty } from '@nestjs/swagger'
import { HttpStatus } from '@nestjs/common'

export class UnauthorizedError {
  @ApiProperty({
    required: true,
    example: HttpStatus.UNAUTHORIZED,
  })
  statusCode: number

  @ApiProperty({
    required: true,
    example: ['Unauthorized'],
  })
  message: string[]
}
