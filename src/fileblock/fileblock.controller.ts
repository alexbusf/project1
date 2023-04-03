import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './multer.config';
import { FileblockService } from './fileblock.service';

@Controller('fileblock')
export class FileblockController {
  constructor(private readonly fileblockService: FileblockService) {}

  @Get()
  findAll() {
    return this.fileblockService.findAll();
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
  async uploadFiles(@UploadedFiles() files) {
    const fileNames = files.map((file) => file.filename);
    const images = await this.fileblockService.saveImages(fileNames);
    return { images, message: 'Files uploaded successfully' };
  } 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileblockService.delete(+id);
  }
}
