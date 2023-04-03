import { Module } from '@nestjs/common';
import { FileblockController } from './fileblock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fileblock } from './entities/fileblock.entity';
import { FileblockService } from './fileblock.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fileblock]),
  ],
  controllers: [FileblockController],
  providers: [FileblockService]
})
export class FileblockModule {}
