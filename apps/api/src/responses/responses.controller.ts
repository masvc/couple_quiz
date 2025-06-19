
// src/responses/responses.controller.ts
import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { Response } from './entities/response.entity';

@ApiTags('responses')
@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post()
  @ApiOperation({ summary: '回答作成' })
  @ApiResponse({ status: 201, description: '回答が正常に作成されました', type: Response })
  create(@Body() createResponseDto: CreateResponseDto): Promise<Response> {
    return this.responsesService.create(createResponseDto);
  }

  @Get()
  @ApiOperation({ summary: '回答一覧取得' })
  @ApiResponse({ status: 200, description: '回答一覧', type: [Response] })
  findAll(): Promise<Response[]> {
    return this.responsesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '回答詳細取得' })
  @ApiResponse({ status: 200, description: '回答詳細', type: Response })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Response> {
    return this.responsesService.findOne(id);
  }

  @Get('couple/:coupleId')
  @ApiOperation({ summary: 'カップル別回答一覧取得' })
  @ApiResponse({ status: 200, description: 'カップル別回答一覧', type: [Response] })
  findByCouple(@Param('coupleId', ParseIntPipe) coupleId: number): Promise<Response[]> {
    return this.responsesService.findByCouple(coupleId);
  }

  @Get('question/:questionId')
  @ApiOperation({ summary: '質問別回答一覧取得' })
  @ApiResponse({ status: 200, description: '質問別回答一覧', type: [Response] })
  findByQuestion(@Param('questionId', ParseIntPipe) questionId: number): Promise<Response[]> {
    return this.responsesService.findByQuestion(questionId);
  }

  @Get('couple/:coupleId/question/:questionId')
  @ApiOperation({ summary: 'カップル・質問別回答取得' })
  @ApiResponse({ status: 200, description: 'カップル・質問別回答', type: [Response] })
  findCoupleQuestionResponses(
    @Param('coupleId', ParseIntPipe) coupleId: number,
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<Response[]> {
    return this.responsesService.findCoupleQuestionResponses(coupleId, questionId);
  }
}