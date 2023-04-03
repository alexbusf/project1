import { Module } from '@nestjs/common';
import { ProfilesService } from './services/profiles.service';
import { RolesService } from './services/roles.service';
import { AuthService } from './services/auth.service';
import { ProfilesController } from './controllers/profiles.controller';
import { RolesController } from './controllers/roles.controller';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { Textblock } from 'src/textblock/entities/textblock.entity';
import { Profile } from './entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User, Profile, Textblock]),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ProfilesController, RolesController, AuthController],
  providers: [ProfilesService, RolesService, AuthService]
})
export class ProfilesModule {}
