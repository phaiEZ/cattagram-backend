import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { UploadImgDto } from './dto/upload-img.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guards';
import { Image } from './image.entity';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload-image')
  uploadProfilePic(
    @Body() uploadImgDto: UploadImgDto,
    @Request() { user }: any,
  ): Promise<Image> {
    return this.imageService.uploadProfilePic(uploadImgDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  getImagesByUserId(@Param('userId') userId: string): Promise<Image[]> {
    return this.imageService.getImagesByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteImageById(
    @Param('id') id: string,
    @Request() { user }: any,
  ): Promise<void> {
    return this.imageService.deleteImageById(id, user.id);
  }
}
