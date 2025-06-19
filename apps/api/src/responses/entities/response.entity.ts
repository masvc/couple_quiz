import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Couple } from '../../couples/entities/couple.entity';
import { Question } from '../../questions/entities/question.entity';
import { User } from '../../users/entities/user.entity';

@Entity('responses')
@Unique(['couple_id', 'question_id', 'user_id'])
export class Response {
  @ApiProperty({ description: '回答ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'カップルID' })
  @Column()
  couple_id: number;

  @ApiProperty({ description: '質問ID' })
  @Column()
  question_id: number;

  @ApiProperty({ description: 'ユーザーID' })
  @Column()
  user_id: number;

  @ApiProperty({ description: '回答内容' })
  @Column('text')
  answer: string;

  @ApiProperty({ description: 'コメント' })
  @Column('text', { nullable: true })
  comment: string;

  @ApiProperty({ description: '回答日' })
  @Column({ type: 'date' })
  response_date: Date;

  @ApiProperty({ description: '作成日時' })
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Couple, couple => couple.responses)
  @JoinColumn({ name: 'couple_id' })
  couple: Couple;

  @ManyToOne(() => Question, question => question.responses)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @ManyToOne(() => User, user => user.responses)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
