import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private rolesRepository: Repository<Role>,) {}
  
  async create(createRoleDto: CreateRoleDto) {
    return await this.rolesRepository.save(createRoleDto);
  }

  async findAll() {
    return await this.rolesRepository.find();
  }

  async findOne(id: number) {
      return await this.rolesRepository.findOneBy({ id });
  }

  async findOneByTitle(title: string) {
    return await this.rolesRepository.findOneBy({ title });
  }

  async update(id: number, createRoleDto: CreateRoleDto) {
    const role = await this.rolesRepository.findOneBy({ id });
    if (!role) {
      throw new HttpException('Role does not exist', HttpStatus.BAD_REQUEST);
    }
    role.title = createRoleDto.title;
    role.description = createRoleDto.description;
    return await this.rolesRepository.save(role);
  }

  async remove(id: number) {
    const role = await this.rolesRepository.findOneBy({ id });
    if (!role) {
      throw new HttpException('Role does not exist', HttpStatus.BAD_REQUEST);
    }
    return await this.rolesRepository.remove(role);
  }
}