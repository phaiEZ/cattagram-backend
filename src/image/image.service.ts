import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageRepository } from './image.repository';
import { Image } from './image.entity';
import { UploadImgDto } from './dto/upload-img.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository,
  ) {}

  async uploadProfilePic(
    uploadImgDto: UploadImgDto,
    user: User,
  ): Promise<Image> {
    const { profilePic, description } = uploadImgDto;

    const image = this.imageRepository.create({
      profilePic,
      description,
      user,
    });

    try {
      await this.imageRepository.save(image);
      return image;
    } catch (e) {
      throw new ConflictException({
        message: ['something wrong '],
      });
    }
  }

  async getImagesByUserId(userId: string): Promise<Image[]> {
    try {
      console.log(userId);
      return await this.imageRepository.find({
        where: { user: { id: userId } },
        // relations: ['user'],
      });
    } catch (error) {
      console.error('Error fetching images by user ID:', error);
      throw new InternalServerErrorException(
        'Error fetching images by user ID',
      );
    }
  }

  async deleteImageById(imageId: string, userId: string): Promise<void> {
    const image = await this.imageRepository.findOne({
      where: { id: imageId },
      relations: ['user'],
    });

    if (!image) {
      throw new NotFoundException(`Image with ID "${imageId}" not found`);
    }

    if (image.user.id !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this image',
      );
    }

    await this.imageRepository.remove(image);
  }
}
