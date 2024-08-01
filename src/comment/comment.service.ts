import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { CatxRepository } from '../catx/catx.repository';
import { Comment } from './comment.entity';
import { User } from 'src/user/user.entity';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
    @InjectRepository(CatxRepository)
    private catxRepository: CatxRepository,
  ) {}

  async addCommentToCatx(
    catxId: string,
    userId: string,
    text: string,
  ): Promise<Comment> {
    const catx = await this.catxRepository.findOne(catxId);

    if (!catx) {
      throw new NotFoundException('Catx not found');
    }

    const comment = this.commentRepository.create({
      text,
      catx,
      user: { id: userId } as User,
    });

    await this.commentRepository.save(comment);

    return comment;
  }

  async deleteCommentById(commentId: string, userId: string): Promise<void> {
    const comment = await this.commentRepository.findOne(commentId, {
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user.id !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this comment',
      );
    }

    await this.commentRepository.remove(comment);
  }

  async getCommentsByCatxId(catxId: string): Promise<CommentDto[]> {
    const comments = await this.commentRepository.find({
      where: { catx: { id: catxId } },
      relations: ['user', 'catx'],
    });

    return comments.map((comment) => ({
      id: comment.id,
      text: comment.text,
      created: comment.created,
      update: comment.update,
      user: {
        id: comment.user.id,
        username: comment.user.username,
        profilePic: comment.user.profilePic,
      },
      catxId: comment.catx.id,
    }));
  }
  
}
