import { ApiProperty } from '@nestjs/swagger'
import { HttpStatus } from '@nestjs/common'

export class NotFoundError {
  @ApiProperty({
    required: true,
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: number

  @ApiProperty({
    type: 'string',
    required: true,
    example: ['Not Found'],
  })
  message: string[]
}
