import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfilesService } from '../services/profiles.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { Roles } from '../guards/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}



  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.update(+id, createProfileDto);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(+id);
  }
}
