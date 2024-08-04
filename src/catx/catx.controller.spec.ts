import { Test, TestingModule } from '@nestjs/testing';
import { CatxController } from './catx.controller';
import { CatxService } from './catx.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guards';
import { CreateCatxDto } from './dto/create.catx.dto';
import { UpdateCatxDto } from './dto/update.catx.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catx } from './catx.entity';

describe('CatxController', () => {
  let controller: CatxController;
  let service: CatxService;

  const mockCatxService = {
    createCatx: jest.fn((description, user) =>
      Promise.resolve({
        id: '1',
        description,
        user,
        created: new Date(),
        update: new Date(),
      }),
    ),
    getCatxsByUserId: jest.fn((userId) =>
      Promise.resolve([
        {
          id: '1',
          description: 'Test description',
          user: { id: userId },
          created: new Date(),
          update: new Date(),
        },
      ]),
    ),
    deleteCatxById: jest.fn(() => Promise.resolve()),
    updateCatx: jest.fn((id, userId, updateCatxDto) =>
      Promise.resolve({
        id,
        ...updateCatxDto,
        user: { id: userId },
        created: new Date(),
        update: new Date(),
      }),
    ),
    getAllCatxs: jest.fn(() =>
      Promise.resolve([
        {
          id: '1',
          description: 'Test description',
          user: { id: '1' },
          created: new Date(),
          update: new Date(),
        },
      ]),
    ),
  };

  const mockJwtAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatxController],
      providers: [
        CatxService,
        {
          provide: getRepositoryToken(Catx),
          useClass: Repository,
        },
      ],
    })
      .overrideProvider(CatxService)
      .useValue(mockCatxService)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<CatxController>(CatxController);
    service = module.get<CatxService>(CatxService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCatx', () => {
    it('should create a new Catx', async () => {
      const dto: CreateCatxDto = { description: 'Test description' };
      const user = { id: '1' };
      expect(await controller.createCatx(dto, { user })).toEqual({
        id: '1',
        description: dto.description,
        user,
        created: expect.any(Date),
        update: expect.any(Date),
      });
      expect(service.createCatx).toHaveBeenCalledWith(dto.description, user);
    });
  });

  describe('getCatxsByUserId', () => {
    it('should return Catx by user ID', async () => {
      const userId = '1';
      expect(await controller.getCatxsByUserId(userId)).toEqual([
        {
          id: '1',
          description: 'Test description',
          user: { id: userId },
          created: expect.any(Date),
          update: expect.any(Date),
        },
      ]);
      expect(service.getCatxsByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('deleteCatxById', () => {
    it('should delete a Catx by ID', async () => {
      const id = '1';
      const user = { id: '1' };
      await controller.deleteCatxById(id, { user });
      expect(service.deleteCatxById).toHaveBeenCalledWith(id, user.id);
    });
  });

  describe('updateCatx', () => {
    it('should update a Catx', async () => {
      const id = '1';
      const user = { id: '1' };
      const dto: UpdateCatxDto = { description: 'Updated description' };
      expect(await controller.updateCatx(id, { user }, dto)).toEqual({
        id,
        description: dto.description,
        user,
        created: expect.any(Date),
        update: expect.any(Date),
      });
      expect(service.updateCatx).toHaveBeenCalledWith(id, user.id, dto);
    });
  });

  describe('getAllCatxs', () => {
    it('should return all Catxs', async () => {
      expect(await controller.getAllCatxs()).toEqual([
        {
          id: '1',
          description: 'Test description',
          user: { id: '1' },
          created: expect.any(Date),
          update: expect.any(Date),
        },
      ]);
      expect(service.getAllCatxs).toHaveBeenCalled();
    });
  });
});
