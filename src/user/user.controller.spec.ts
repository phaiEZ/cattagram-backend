import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guards';
import { SignUpDto } from './dto/signup.dto';
import { User } from './user.entity';

import { UpdateUserDto } from './dto/update-user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dtp';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    signUp: jest.fn((dto) => Promise.resolve({ id: '1', ...dto })),
    getUserInfo: jest.fn((id) => Promise.resolve({ id, username: 'testUser' })),
    changePassword: jest.fn(),
    updateUserInfo: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),
    getUserById: jest.fn((id) => Promise.resolve({ id, username: 'testUser' })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('should create a new user', async () => {
      const dto: SignUpDto = {
        username: 'testUser',
        password: 'password123',
        catName: 'Fluffy',
        ownerName: 'John Doe',
        gender: 'Male',
        breeds: 'Persian',
        birthPlace: 'USA',
        description: 'A cute cat',
        profilePic: 'pic.jpg',
      };
      expect(await controller.signUp(dto)).toEqual({
        id: '1',
        ...dto,
      });
      expect(service.signUp).toHaveBeenCalledWith(dto);
    });
  });

  describe('getUserInfo', () => {
    it('should return user info', async () => {
      const user = { id: '1', username: 'testUser' };
      expect(await controller.getUserInfo({ user })).toEqual(user);
      expect(service.getUserInfo).toHaveBeenCalledWith('1');
    });
  });

  describe('changePassword', () => {
    it('should change user password', async () => {
      const user = { id: '1' };
      const dto: ChangePasswordDto = {
        oldPassword: 'oldPass',
        newPassword: 'newPass123',
      };
      await controller.changePassword({ user }, dto);
      expect(service.changePassword).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('updateUserInfo', () => {
    it('should update user info', async () => {
      const user = { id: '1' };
      const dto: UpdateUserDto = { catName: 'Snowy', ownerName: 'Jane Doe' };
      expect(await controller.updateUserInfo({ user }, dto)).toEqual({
        id: '1',
        ...dto,
      });
      expect(service.updateUserInfo).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('getUserById', () => {
    it('should return user by ID', async () => {
      const id = '1';
      expect(await controller.getUserById(id)).toEqual({
        id,
        username: 'testUser',
      });
      expect(service.getUserById).toHaveBeenCalledWith(id);
    });
  });
});
