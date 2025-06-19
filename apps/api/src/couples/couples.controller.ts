
// src/couples/couples.controller.ts
import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CouplesService } from './couples.service';
import { CreateCoupleDto } from './dto/create-couple.dto';
import { Couple } from './entities/couple.entity';

@ApiTags('couples')
@Controller('couples')
export class CouplesController {
  constructor(private readonly couplesService: CouplesService) {}

  @Post()
  @ApiOperation({ summary: 'カップル作成' })
  @ApiResponse({ status: 201, description: 'カップルが正常に作成されました', type: Couple })
  create(@Body() createCoupleDto: CreateCoupleDto): Promise<Couple> {
    return this.couplesService.create(createCoupleDto);
  }

  @Get()
  @ApiOperation({ summary: 'カップル一覧取得' })
  @ApiResponse({ status: 200, description: 'カップル一覧', type: [Couple] })
  findAll(): Promise<Couple[]> {
    return this.couplesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'カップル詳細取得' })
  @ApiResponse({ status: 200, description: 'カップル詳細', type: Couple })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Couple> {
    return this.couplesService.findOne(id);
  }

  @Patch(':id/increment-day')
  @ApiOperation({ summary: '日数をインクリメント' })
  @ApiResponse({ status: 200, description: '日数が更新されました', type: Couple })
  incrementDay(@Param('id', ParseIntPipe) id: number): Promise<Couple> {
    return this.couplesService.incrementDay(id);
  }
}
