import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from '../dto/create-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(@InjectRepository(Group) private groupRepository: Repository<Group>,) {}
  
  async create(createGroupDto: CreateGroupDto) {
    return await this.groupRepository.save(createGroupDto);
  }

  async findAll() {
    return await this.groupRepository.find();
  }

  async findOne(id: number) {
    return await this.groupRepository.findOneBy({ id });
  }

  async update(id: number, createGroupDto: CreateGroupDto) {
    const group = await this.groupRepository.findOneBy({ id });
    if (!group) {
      throw new HttpException('Role does not exist', HttpStatus.BAD_REQUEST);
    }
    group.title = createGroupDto.title;
    return await this.groupRepository.save(group);
  }

  async remove(id: number) {
    const group = await this.groupRepository.findOneBy({ id });
    if (!group) {
      throw new HttpException('Role does not exist', HttpStatus.BAD_REQUEST);
    }
    return await this.groupRepository.remove(group);
  }
}