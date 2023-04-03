import { Module } from '@nestjs/common';
import { TextblockService } from './services/textblock.service';
import { GroupService } from './services/group.service';
import { TextblockController } from './controllers/textblock.controller';
import { GroupController } from './controllers/group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Textblock } from './entities/textblock.entity';
import { User } from 'src/profiles/entities/user.entity';
import { Group } from './entities/group.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Textblock, Group]),
  ],
  controllers: [TextblockController, GroupController],
  providers: [TextblockService, GroupService]
})
export class TextblockModule {}
