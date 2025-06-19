import { IsString, IsEnum, IsOptional, IsInt, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '../entities/question.entity';

export class CreateQuestionDto {
  @ApiProperty({ description: '質問文', example: '好きな食べ物は何ですか？' })
  @IsString()
  @IsNotEmpty()
  question_text: string;

  @ApiProperty({ description: '質問タイプ', enum: QuestionType, example: QuestionType.MANUAL })
  @IsEnum(QuestionType)
  question_type: QuestionType;

  @ApiProperty({ description: 'カテゴリ', example: '基本情報', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ description: 'マニュアル質問の順番', example: 1, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  manual_order?: number;

  @ApiProperty({ description: 'AI生成時の文脈情報', required: false })
  @IsOptional()
  @IsString()
  ai_context?: string;
}
