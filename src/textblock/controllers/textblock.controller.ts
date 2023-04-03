import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TextblockService } from '../services/textblock.service';
import { CreateTextblockDto } from '../dto/create-textblock.dto';

@Controller('textblock')
export class TextblockController {
  constructor(private readonly textblockService: TextblockService) {}

  @Post()
  create(@Body() createTextblockDto: CreateTextblockDto) {
    return this.textblockService.create(createTextblockDto);
  }

  @Get()
  findAll() {
    return this.textblockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.textblockService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createTextblockDto: CreateTextblockDto) {
    return this.textblockService.update(+id, createTextblockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.textblockService.remove(+id);
  }
}
