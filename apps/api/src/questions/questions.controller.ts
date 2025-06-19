
// src/questions/questions.controller.ts
import { Controller, Get, Post, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question, QuestionType } from './entities/question.entity';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiOperation({ summary: '質問作成' })
  @ApiResponse({ status: 201, description: '質問が正常に作成されました', type: Question })
  create(@Body() createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: '質問一覧取得' })
  @ApiResponse({ status: 200, description: '質問一覧', type: [Question] })
  @ApiQuery({ name: 'type', enum: QuestionType, required: false })
  @ApiQuery({ name: 'category', type: 'string', required: false })
  findAll(
    @Query('type') type?: QuestionType,
    @Query('category') category?: string,
  ): Promise<Question[]> {
    if (type) {
      return this.questionsService.findByType(type);
    }
    if (category) {
      return this.questionsService.findByCategory(category);
    }
    return this.questionsService.findAll();
  }

  @Get('manual')
  @ApiOperation({ summary: 'マニュアル質問一覧取得' })
  @ApiResponse({ status: 200, description: 'マニュアル質問一覧', type: [Question] })
  findManualQuestions(): Promise<Question[]> {
    return this.questionsService.findManualQuestions();
  }

  @Get(':id')
  @ApiOperation({ summary: '質問詳細取得' })
  @ApiResponse({ status: 200, description: '質問詳細', type: Question })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Question> {
    return this.questionsService.findOne(id);
  }

  @Get('couple/:coupleId/today')
  @ApiOperation({ summary: '今日の質問取得' })
  @ApiResponse({ status: 200, description: '今日の質問', type: Question })
  getTodaysQuestion(
    @Param('coupleId', ParseIntPipe) coupleId: number,
    @Query('day', ParseIntPipe) day: number,
  ): Promise<Question | null> {
    return this.questionsService.getTodaysQuestion(coupleId, day);
  }
}