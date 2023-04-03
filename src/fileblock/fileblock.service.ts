import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fileblock } from './entities/fileblock.entity';
import { CrealeFileBlockDto } from './dto/create-fileblock.dto';
import { join } from 'path';
import { promisify } from 'util';

@Injectable()
export class FileblockService {
  constructor(@InjectRepository(Fileblock) private readonly fileRepository: Repository<Fileblock>) {}

  async findAll() {
    return await this.fileRepository.find();
  }

  async saveImages(fileNames: string[]): Promise<CrealeFileBlockDto[]> {
    const images = fileNames.map((name) => this.fileRepository.create({ path: name }));
    const savedImages = await this.fileRepository.save(images);
    return savedImages.map(({ path }) => ({ path }));
  }

  async delete(id: number) {
    const file = await this.fileRepository.findOneBy({ id });
    if (!file) {
      throw new HttpException('Role does not exist', HttpStatus.BAD_REQUEST);
    }
    const path = join(__dirname, '..', '..', 'uploads', file.path);
    await this.fileRepository.remove(file);
    await promisify(require('fs').unlink)(path);
  }
}
