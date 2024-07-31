import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageRepository } from './image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ImageRepository])],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
