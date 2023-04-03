import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTextblockDto } from '../dto/create-textblock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Textblock } from '../entities/textblock.entity';
import { GroupService } from './group.service';

@Injectable()
export class TextblockService {
  constructor(@InjectRepository(Textblock) private textblockRepository: Repository<Textblock>,
    private groupService: GroupService) {}
  
  async create(createTextblockDto: CreateTextblockDto) {
    const group = await this.groupService.findOne(createTextblockDto.userId);
    if (!group) {
      throw new HttpException('Group does not exist', HttpStatus.BAD_REQUEST);
    }
    const textblock = this.textblockRepository.create(createTextblockDto);
    textblock.group = group;
    return await this.textblockRepository.save(textblock);
  }

  async findAll() {
    return await this.textblockRepository.find({ relations: {group: true} });
  }

  async findOne(id: number) {
    return await this.textblockRepository.findOne({ where: { id }, relations: {group: true} });
  }

  async update(id: number, createTextblockDto: CreateTextblockDto) {
    const textblock = await this.textblockRepository.findOneBy({ id });
    if (!textblock) {
      throw new HttpException('Textblock does not exist', HttpStatus.BAD_REQUEST);
    }
    return await this.textblockRepository.save({ ...createTextblockDto, id: id })
  }

  async remove(id: number) {
    const textblock = await this.textblockRepository.findOneBy({ id });
    if (!textblock) {
      throw new HttpException('Textblock does not exist', HttpStatus.BAD_REQUEST);
    }
    return await this.textblockRepository.remove(textblock);
  }
}
