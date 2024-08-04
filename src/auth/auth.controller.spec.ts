import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guards';
import { JwtAuthGuard } from './jwt/jwt-auth.guards';
import { ExecutionContext } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    signIn: jest.fn((user) => Promise.resolve({ token: 'mockToken', user })),
  };

  const mockLocalAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  const mockJwtAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .overrideGuard(LocalAuthGuard)
      .useValue(mockLocalAuthGuard)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should sign in a user', async () => {
      const req = { user: { id: '1', username: 'testUser' } };
      expect(await controller.signIn(req)).toEqual({
        token: 'mockToken',
        user: req.user,
      });
      expect(service.signIn).toHaveBeenCalledWith(req.user);
    });
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      const req = { user: { id: '1', username: 'testUser' } };
      expect(await controller.getProfile(req)).toEqual(req.user);
    });
  });
});
