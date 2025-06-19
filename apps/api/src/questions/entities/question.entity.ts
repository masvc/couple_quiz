import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Response } from '../../responses/entities/response.entity';

export enum QuestionType {
  MANUAL = 'manual',
  AI_GENERATED = 'ai_generated',
}

@Entity('questions')
export class Question {
  @ApiProperty({ description: '質問ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '質問文' })
  @Column('text')
  question_text: string;

  @ApiProperty({ description: '質問タイプ', enum: QuestionType })
  @Column({ type: 'enum', enum: QuestionType })
  question_type: QuestionType;

  @ApiProperty({ description: 'カテゴリ' })
  @Column({ length: 100, nullable: true })
  category: string;

  @ApiProperty({ description: 'マニュアル質問の順番' })
  @Column({ nullable: true })
  manual_order: number;

  @ApiProperty({ description: 'AI生成時の文脈情報' })
  @Column('text', { nullable: true })
  ai_context: string;

  @ApiProperty({ description: '作成日時' })
  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Response, response => response.question)
  responses: Response[];
}
