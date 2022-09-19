import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class ConflictError {
  @ApiProperty({
    required: true,
    example: HttpStatus.CONFLICT,
  })
  statusCode: number;

  @ApiProperty({
    type: 'string',
    required: true,
    example: ['Conflict'],
  })
  message: string[];
}
