import { IsInt, IsDateString, IsOptional, IsBoolean, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoupleDto {
  @ApiProperty({ description: '男性ユーザーID', example: 1 })
  @IsInt()
  @Min(1)
  male_user_id: number;

  @ApiProperty({ description: '女性ユーザーID', example: 2 })
  @IsInt()
  @Min(1)
  female_user_id: number;

  @ApiProperty({ description: '開始日', example: '2024-05-01' })
  @IsDateString()
  start_date: string;

  @ApiProperty({ description: '現在の日数', example: 1, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  current_day?: number;

  @ApiProperty({ description: 'アクティブフラグ', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
