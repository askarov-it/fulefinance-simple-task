import { ApiProperty } from '@nestjs/swagger'
import { HttpStatus } from '@nestjs/common'

export class ForbiddenError {
  @ApiProperty({
    required: true,
    example: HttpStatus.FORBIDDEN,
  })
  statusCode: number

  @ApiProperty({
    type: 'string',
    required: true,
    example: ['Forbidden'],
  })
  message: string[]
}
