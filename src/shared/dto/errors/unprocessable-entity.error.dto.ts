import { ApiProperty } from '@nestjs/swagger'
import { HttpStatus } from '@nestjs/common'

export class UnprocessableEntityError {
  @ApiProperty({
    required: true,
    example: HttpStatus.UNPROCESSABLE_ENTITY,
  })
  statusCode: number

  @ApiProperty({
    type: 'string',
    required: true,
    example: ['Unprocessable Entity'],
  })
  message: string[]
}
