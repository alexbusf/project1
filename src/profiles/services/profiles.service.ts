import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RolesService } from './roles.service';

@Injectable()
export class ProfilesService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>,
  private rolesService: RolesService) {}

  async create(createProfileDto: CreateProfileDto) {
    const role = await this.rolesService.findOneByTitle("USER");
    if (!role) {
      throw new HttpException('Role does not exist', HttpStatus.BAD_REQUEST);
    }
    const user = this.usersRepository.create(createProfileDto);
    //установка роли
    user.roles = [role];
    //сохранение пользователя и роли
    return await this.usersRepository.save(user);
  }

  async findAll() {
    return this.usersRepository.find({ relations: {roles: true} });
  }

  async findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOne( { where: { email }, relations: {roles: true}, } );
  }

  async update(id: number, createProfileDto: CreateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  async remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
