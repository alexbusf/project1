import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateTextblockDto } from '../dto/create-textblock.dto';
import { CreateGroupDto } from '../dto/create-group.dto';
import { GroupService } from '../services/group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createGroupDto: CreateGroupDto) {
    return this.groupService.update(+id, createGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}