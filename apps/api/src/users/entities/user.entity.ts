import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Response } from '../../responses/entities/response.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity('users')
export class User {
  @ApiProperty({ description: 'ユーザーID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '名前' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ description: '年齢' })
  @Column()
  age: number;

  @ApiProperty({ description: '性別', enum: Gender })
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @ApiProperty({ description: '住所' })
  @Column({ length: 200 })
  location: string;

  @ApiProperty({ description: '作成日時' })
  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Response, response => response.user)
  responses: Response[];
}
