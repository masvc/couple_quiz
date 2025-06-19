import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Couple } from './entities/couple.entity';
import { CreateCoupleDto } from './dto/create-couple.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CouplesService {
  constructor(
    @InjectRepository(Couple)
    private couplesRepository: Repository<Couple>,
    private usersService: UsersService,
  ) {}

  async create(createCoupleDto: CreateCoupleDto): Promise<Couple> {
    // ユーザーの存在確認
    const users = await this.usersService.findByIds([
      createCoupleDto.male_user_id,
      createCoupleDto.female_user_id,
    ]);

    if (users.length !== 2) {
      throw new BadRequestException('指定されたユーザーが見つかりません');
    }

    // 性別チェック
    const maleUser = users.find(u => u.id === createCoupleDto.male_user_id);
    const femaleUser = users.find(u => u.id === createCoupleDto.female_user_id);

    if (maleUser?.gender !== 'male' || femaleUser?.gender !== 'female') {
      throw new BadRequestException('性別の組み合わせが正しくありません');
    }

    const couple = this.couplesRepository.create(createCoupleDto);
    return await this.couplesRepository.save(couple);
  }

  async findAll(): Promise<Couple[]> {
    return await this.couplesRepository.find({
      relations: ['maleUser', 'femaleUser'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Couple> {
    const couple = await this.couplesRepository.findOne({
      where: { id },
      relations: ['maleUser', 'femaleUser'],
    });
    
    if (!couple) {
      throw new NotFoundException(`Couple with ID ${id} not found`);
    }
    
    return couple;
  }

  async updateCurrentDay(id: number, day: number): Promise<Couple> {
    const couple = await this.findOne(id);
    couple.current_day = day;
    return await this.couplesRepository.save(couple);
  }

  async incrementDay(id: number): Promise<Couple> {
    const couple = await this.findOne(id);
    couple.current_day += 1;
    return await this.couplesRepository.save(couple);
  }
}
