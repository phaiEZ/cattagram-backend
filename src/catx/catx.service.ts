import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatxRepository } from './catx.repository';
import { Catx } from './catx.entity';
import { CreateCatxDto } from './dto/create.catx.dto';
import { User } from 'src/user/user.entity';
import { UpdateCatxDto } from './dto/update.catx.dto';

@Injectable()
export class CatxService {
  constructor(
    @InjectRepository(CatxRepository)
    private catxRepository: CatxRepository,
  ) {}

  async createCatx(description: string, user: User): Promise<Catx> {
    const catx = this.catxRepository.create({
      description,
      user,
    });

    await this.catxRepository.save(catx);
    return catx;
  }

  async getCatxsByUserId(userId: string): Promise<Catx[]> {
    return this.catxRepository
      .createQueryBuilder('catx')
      .leftJoinAndSelect('catx.user', 'user')
      .select([
        'catx.id',
        'catx.description',
        'catx.created',
        'user.username',
        'user.id',
        'user.profilePic',
        'user.username',
      ])
      .where('catx.user.id = :userId', { userId })
      .getMany();
  }

  async deleteCatxById(catxId: string, userId: string): Promise<void> {
    const catx = await this.catxRepository.findOne(catxId, {
      relations: ['user'],
    });

    if (!catx || catx.user.id !== userId) {
      throw new NotFoundException('Catx not found or unauthorized');
    }

    await this.catxRepository.remove(catx);
  }

  async updateCatx(
    catxId: string,
    userId: string,
    updateCatxDto: UpdateCatxDto,
  ): Promise<Catx> {
    const catx = await this.catxRepository.findOne(catxId, {
      relations: ['user'],
    });

    if (!catx) {
      throw new NotFoundException('Catx not found');
    }

    if (catx.user.id !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this Catx',
      );
    }

    Object.assign(catx, updateCatxDto);
    return this.catxRepository.save(catx);
  }

  async getAllCatxs(): Promise<Catx[]> {
    return this.catxRepository
      .createQueryBuilder('catx')
      .leftJoinAndSelect('catx.user', 'user')
      .select([
        'catx.id',
        'catx.description',
        'catx.created',
        'user.username',
        'user.id',
        'user.profilePic',
      ])
      .orderBy('catx.created', 'DESC')
      .getMany();
  }
}
