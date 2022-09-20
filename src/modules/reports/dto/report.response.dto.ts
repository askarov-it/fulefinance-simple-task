import { ApiProperty } from '@nestjs/swagger'

class TotalDto {
  @ApiProperty({
    required: true,
    description: 'date MM-YYYY'
  })
  date: string

  @ApiProperty({
    required: true,
  })
  total: number
}

export class ReportResponseDto {
  @ApiProperty()
  source: string

  @ApiProperty()
  data: TotalDto
}
