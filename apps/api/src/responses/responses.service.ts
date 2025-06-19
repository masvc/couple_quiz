
// src/responses/responses.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './entities/response.entity';
import { CreateResponseDto } from './dto/create-response.dto';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Response)
    private responsesRepository: Repository<Response>,
  ) {}

  async create(createResponseDto: CreateResponseDto): Promise<Response> {
    // 重複チェック
    const existing = await this.responsesRepository.findOne({
      where: {
        couple_id: createResponseDto.couple_id,
        question_id: createResponseDto.question_id,
        user_id: createResponseDto.user_id,
      },
    });

    if (existing) {
      throw new ConflictException('この質問にはすでに回答済みです');
    }

    const response = this.responsesRepository.create(createResponseDto);
    return await this.responsesRepository.save(response);
  }

  async findAll(): Promise<Response[]> {
    return await this.responsesRepository.find({
      relations: ['couple', 'question', 'user'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Response> {
    const response = await this.responsesRepository.findOne({
      where: { id },
      relations: ['couple', 'question', 'user'],
    });
    
    if (!response) {
      throw new NotFoundException(`Response with ID ${id} not found`);
    }
    
    return response;
  }

  async findByCouple(coupleId: number): Promise<Response[]> {
    return await this.responsesRepository.find({
      where: { couple_id: coupleId },
      relations: ['question', 'user'],
      order: { response_date: 'ASC' },
    });
  }

  async findByQuestion(questionId: number): Promise<Response[]> {
    return await this.responsesRepository.find({
      where: { question_id: questionId },
      relations: ['couple', 'user'],
      order: { created_at: 'DESC' },
    });
  }

  async findCoupleQuestionResponses(coupleId: number, questionId: number): Promise<Response[]> {
    return await this.responsesRepository.find({
      where: { 
        couple_id: coupleId,
        question_id: questionId 
      },
      relations: ['user'],
      order: { created_at: 'ASC' },
    });
  }
}