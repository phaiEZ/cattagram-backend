import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { CommentService } from './comment.service';

import { Comment } from './comment.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guards';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Request() { user }: any,
  ): Promise<Comment> {
    return this.commentService.addCommentToCatx(
      createCommentDto.catxId,
      user.id,
      createCommentDto.text,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCommentById(
    @Param('id') commentId: string,
    @Request() { user }: any,
  ): Promise<{ message: string }> {
    await this.commentService.deleteCommentById(commentId, user.id);
    return { message: 'Comment deleted successfully' };
  }
}
