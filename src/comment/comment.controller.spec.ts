import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guards';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';
import { CommentDto } from './dto/comment.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('CommentController', () => {
  let controller: CommentController;
  let service: CommentService;

  const mockCommentService = {
    addCommentToCatx: jest.fn((catxId, userId, text) =>
      Promise.resolve({
        id: '1',
        text,
        created: new Date(),
        update: new Date(),
        user: { id: userId, username: 'testUser', profilePic: 'pic.jpg' },
        catx: { id: catxId },
      }),
    ),
    deleteCommentById: jest.fn(() => Promise.resolve()),
    getCommentsByCatxId: jest.fn((catxId) =>
      Promise.resolve([
        {
          id: '1',
          text: 'Test comment',
          created: new Date(),
          update: new Date(),
          user: { id: '1', username: 'testUser', profilePic: 'pic.jpg' },
          catx: { id: catxId },
        },
      ]),
    ),
  };

  const mockJwtAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        CommentService,
        {
          provide: getRepositoryToken(Comment),
          useClass: Repository,
        },
      ],
    })
      .overrideProvider(CommentService)
      .useValue(mockCommentService)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<CommentController>(CommentController);
    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createComment', () => {
    it('should create a new comment', async () => {
      const dto: CreateCommentDto = { catxId: '1', text: 'Test comment' };
      const user = { id: '1' };
      expect(await controller.createComment(dto, { user })).toEqual({
        id: '1',
        text: dto.text,
        created: expect.any(Date),
        update: expect.any(Date),
        user: { id: user.id, username: 'testUser', profilePic: 'pic.jpg' },
        catx: { id: dto.catxId },
      });
      expect(service.addCommentToCatx).toHaveBeenCalledWith(
        dto.catxId,
        user.id,
        dto.text,
      );
    });
  });

  describe('deleteCommentById', () => {
    it('should delete a comment by ID', async () => {
      const commentId = '1';
      const user = { id: '1' };
      await controller.deleteCommentById(commentId, { user });
      expect(service.deleteCommentById).toHaveBeenCalledWith(
        commentId,
        user.id,
      );
    });
  });

  describe('getCommentsByCatxId', () => {
    it('should return comments by Catx ID', async () => {
      const catxId = '1';
      expect(await controller.getCommentsByCatxId(catxId)).toEqual([
        {
          id: '1',
          text: 'Test comment',
          created: expect.any(Date),
          update: expect.any(Date),
          user: { id: '1', username: 'testUser', profilePic: 'pic.jpg' },
          catx: { id: catxId },
        },
      ]);
      expect(service.getCommentsByCatxId).toHaveBeenCalledWith(catxId);
    });
  });
});
