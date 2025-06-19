
// src/questions/questions.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question, QuestionType } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = this.questionsRepository.create(createQuestionDto);
    return await this.questionsRepository.save(question);
  }

  async findAll(): Promise<Question[]> {
    return await this.questionsRepository.find({
      order: { 
        question_type: 'ASC',
        manual_order: 'ASC',
        created_at: 'ASC'
      },
    });
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.questionsRepository.findOne({ where: { id } });
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  async findManualQuestions(): Promise<Question[]> {
    return await this.questionsRepository.find({
      where: { question_type: QuestionType.MANUAL },
      order: { manual_order: 'ASC' },
    });
  }

  async findByType(type: QuestionType): Promise<Question[]> {
    return await this.questionsRepository.find({
      where: { question_type: type },
      order: { created_at: 'DESC' },
    });
  }

  async findByCategory(category: string): Promise<Question[]> {
    return await this.questionsRepository.find({
      where: { category },
      order: { created_at: 'DESC' },
    });
  }

  async getTodaysQuestion(coupleId: number, currentDay: number): Promise<Question | null> {
    // まずはマニュアル質問から取得
    const manualQuestion = await this.questionsRepository.findOne({
      where: { 
        question_type: QuestionType.MANUAL,
        manual_order: currentDay
      },
    });

    if (manualQuestion) {
      return manualQuestion;
    }

    // マニュアル質問が終わったらAI生成質問から取得
    // 実際の実装ではカップル固有のAI質問を取得するロジックが必要
    const aiQuestions = await this.questionsRepository.find({
      where: { question_type: QuestionType.AI_GENERATED },
      order: { created_at: 'ASC' },
    });

    const questionIndex = (currentDay - 11) % aiQuestions.length;
    return aiQuestions[questionIndex] || null;
  }
}
