import { ApiProperty } from '@nestjs/swagger'
import { HttpStatus } from '@nestjs/common'

export class InternalServerError {
  @ApiProperty({
    required: true,
    example: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  statusCode: number

  @ApiProperty({
    type: 'string',
    required: true,
    example: ['Internal Server Error'],
  })
  message: string[]
}
