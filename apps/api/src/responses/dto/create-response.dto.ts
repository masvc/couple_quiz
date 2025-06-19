import { IsString, IsInt, IsDateString, IsOptional, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResponseDto {
  @ApiProperty({ description: 'カップルID', example: 1 })
  @IsInt()
  @Min(1)
  couple_id: number;

  @ApiProperty({ description: '質問ID', example: 1 })
  @IsInt()
  @Min(1)
  question_id: number;

  @ApiProperty({ description: 'ユーザーID', example: 1 })
  @IsInt()
  @Min(1)
  user_id: number;

  @ApiProperty({ description: '回答内容', example: 'ラーメンと寿司が大好きです！' })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty({ description: 'コメント', example: '一緒に食べに行きたいな', required: false })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({ description: '回答日', example: '2024-05-01' })
  @IsDateString()
  response_date: string;
}
