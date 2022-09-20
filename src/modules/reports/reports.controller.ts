import { Controller, HttpCode, HttpStatus, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReportResponseDto, ReportQueryDto } from './dto';
import { BadRequestError, InternalServerError, UnauthorizedError } from '../../shared/dto/errors';
import { AuthGuard } from '../../shared/guard/auth.guard';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(
    private readonly service: ReportsService,
  ) {}

  @ApiOperation({ description: 'Simple report. Total sum transaction' })
  @ApiUnauthorizedResponse({ type: UnauthorizedError })
  @ApiBadRequestResponse({ type: BadRequestError })
  @ApiInternalServerErrorResponse({ type: InternalServerError })
  @UseGuards(AuthGuard)
  @Get('total')
  @HttpCode(HttpStatus.OK)
  async totalSumReport(@Query() query: ReportQueryDto): Promise<ReportResponseDto> {
    return this.service.report(query);
  }
}
