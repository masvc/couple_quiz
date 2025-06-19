
// src/ai/ai.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { Question } from '../questions/entities/question.entity';
import { Response } from '../responses/entities/response.entity';
import { CouplesModule } from '../couples/couples.module';
import { ResponsesModule } from '../responses/responses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Response]),
    CouplesModule,
    ResponsesModule,
  ],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}