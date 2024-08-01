import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CatxRepository } from '../catx/catx.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository, CatxRepository])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
