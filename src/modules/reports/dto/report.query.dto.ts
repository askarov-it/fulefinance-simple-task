import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ReportQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  date?: string
}
