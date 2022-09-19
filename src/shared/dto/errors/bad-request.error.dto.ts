import { ApiProperty } from '@nestjs/swagger'
import { HttpStatus } from '@nestjs/common'

export class BadRequestError {
  @ApiProperty({
    required: true,
    example: HttpStatus.BAD_REQUEST,
  })
  statusCode: number

  @ApiProperty({
    type: String,
    required: true,
    example: 'Bad Request',
  })
  error: string

  @ApiProperty({
    type: 'string',
    isArray: true,
    required: true,
    example: ['field must be a string'],
  })
  message: string[]
}
