import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Response } from '../../responses/entities/response.entity';

@Entity('couples')
export class Couple {
  @ApiProperty({ description: 'カップルID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '男性ユーザーID' })
  @Column()
  male_user_id: number;

  @ApiProperty({ description: '女性ユーザーID' })
  @Column()
  female_user_id: number;

  @ApiProperty({ description: '開始日' })
  @Column({ type: 'date' })
  start_date: Date;

  @ApiProperty({ description: '現在の日数' })
  @Column({ default: 1 })
  current_day: number;

  @ApiProperty({ description: 'アクティブフラグ' })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({ description: '作成日時' })
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'male_user_id' })
  maleUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'female_user_id' })
  femaleUser: User;

  @OneToMany(() => Response, response => response.couple)
  responses: Response[];
}
