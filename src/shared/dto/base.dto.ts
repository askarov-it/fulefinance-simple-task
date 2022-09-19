import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  readonly createdAt: string;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  readonly updatedAt: string;
}
