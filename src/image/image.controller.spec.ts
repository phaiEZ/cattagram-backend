import { Test, TestingModule } from '@nestjs/testing';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guards';
import { Image } from './image.entity';
import { UploadImgDto } from './dto/upload-img.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ImageController', () => {
  let controller: ImageController;
  let service: ImageService;

  const mockImageService = {
    uploadProfilePic: jest.fn((dto, user) =>
      Promise.resolve({ id: '1', ...dto, user }),
    ),
    getImagesByUserId: jest.fn((userId) =>
      Promise.resolve([
        { id: '1', userId, img: 'image.jpg', description: 'description' },
      ]),
    ),
    deleteImageById: jest.fn(() => Promise.resolve()),
  };

  const mockJwtAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [
        ImageService,
        {
          provide: getRepositoryToken(Image),
          useClass: Repository,
        },
      ],
    })
      .overrideProvider(ImageService)
      .useValue(mockImageService)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<ImageController>(ImageController);
    service = module.get<ImageService>(ImageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadProfilePic', () => {
    it('should upload a profile picture', async () => {
      const dto: UploadImgDto = {
        img: 'image.jpg',
        description: 'description',
      };
      const user = { id: '1' };
      expect(await controller.uploadProfilePic(dto, { user })).toEqual({
        id: '1',
        ...dto,
        user,
      });
      expect(service.uploadProfilePic).toHaveBeenCalledWith(dto, user);
    });
  });

  describe('getImagesByUserId', () => {
    it('should return images by user ID', async () => {
      const userId = '1';
      expect(await controller.getImagesByUserId(userId)).toEqual([
        { id: '1', userId, img: 'image.jpg', description: 'description' },
      ]);
      expect(service.getImagesByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('deleteImageById', () => {
    it('should delete an image by ID', async () => {
      const id = '1';
      const user = { id: '1' };
      await controller.deleteImageById(id, { user });
      expect(service.deleteImageById).toHaveBeenCalledWith(id, user.id);
    });
  });
});
