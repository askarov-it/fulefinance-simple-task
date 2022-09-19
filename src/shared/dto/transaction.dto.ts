import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty()
  date : string;

  @ApiProperty()
  sum: number;

  @ApiProperty()
  source: string;

  @ApiProperty()
  description: string;
}
