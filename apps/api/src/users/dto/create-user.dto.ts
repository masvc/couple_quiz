import { IsString, IsInt, IsEnum, Min, Max, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ description: '名前', example: '田中太郎' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '年齢', example: 28, minimum: 18, maximum: 100 })
  @IsInt()
  @Min(18)
  @Max(100)
  age: number;

  @ApiProperty({ description: '性別', enum: Gender, example: Gender.MALE })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ description: '住所', example: '東京都渋谷区' })
  @IsString()
  @IsNotEmpty()
  location: string;
}
