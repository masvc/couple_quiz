
// src/ai/ai.controller.ts
import { Controller, Post, Param, ParseIntPipe, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AiService, AIQuestionContext } from './ai.service';
import { CouplesService } from '../couples/couples.service';
import { ResponsesService } from '../responses/responses.service';
import { Question } from '../questions/entities/question.entity';

@ApiTags('ai')
@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly couplesService: CouplesService,
    private readonly responsesService: ResponsesService,
  ) {}

  @Post('generate-question/:coupleId')
  @ApiOperation({ summary: 'AI質問生成' })
  @ApiResponse({ status: 201, description: 'AI質問が生成されました', type: Question })
  async generateQuestion(@Param('coupleId', ParseIntPipe) coupleId: number): Promise<Question> {
    const couple = await this.couplesService.findOne(coupleId);
    const responses = await this.responsesService.findByCouple(coupleId);
    
    const context: AIQuestionContext = {
      couple,
      responses,
      currentDay: couple.current_day,
    };

    return await this.aiService.generateQuestion(context);
  }

  @Get('compatibility/:coupleId')
  @ApiOperation({ summary: 'カップル相性分析' })
  @ApiResponse({ status: 200, description: '相性分析結果' })
  async analyzeCompatibility(@Param('coupleId', ParseIntPipe) coupleId: number): Promise<any> {
    return await this.aiService.analyzeCompatibility(coupleId);
  }
}