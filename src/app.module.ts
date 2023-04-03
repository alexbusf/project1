import { Module } from '@nestjs/common';
import { ProfilesModule } from './profiles/profiles.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Role } from './profiles/entities/role.entity';
import { User } from './profiles/entities/user.entity';
import { Profile } from './profiles/entities/profile.entity';
import { Group } from './textblock/entities/group.entity';
import { Textblock } from './textblock/entities/textblock.entity';
import { TextblockModule } from './textblock/textblock.module';
import { FileblockModule } from './fileblock/fileblock.module';
import { Fileblock } from './fileblock/entities/fileblock.entity';
import { join } from 'path'


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Role, User, Textblock, Group, Profile, Fileblock],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    ProfilesModule,
    TextblockModule,
    FileblockModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
