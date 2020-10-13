import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import * as Mongoose from 'mongoose';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) { }

  @Post()
  async addComment(
    @Body('user_id') user_id: Mongoose.Schema.Types.ObjectId,
    @Body('quizz_id') quizz_id: Mongoose.Schema.Types.ObjectId,
    @Body('comment') comment: string,
  ) {
    const result = await this.commentService.createComment(user_id, quizz_id, comment);
    return result
  }

  @Get()
  async getAllComments() {
    const result = await this.commentService.getComments();
    return result
  }

  @Get('quizz/:id')
  async getQuizComments(
    @Param('id') quizzId: Mongoose.Schema.Types.ObjectId
  ) {
    const result = await this.commentService.getQuizComment(quizzId);
    return result
  }

  @Patch(':id')
  async updateComment(
    @Param('id') commentId: Mongoose.Schema.Types.ObjectId,
    @Body('comment') comment: string
  ) {
    const result = await this.commentService.updateComment(commentId, comment);
    return result
  }

  @Delete(':id')
  async deleteComment(
    @Param('id') commentId: Mongoose.Schema.Types.ObjectId
  ) {
    const result = await this.commentService.deleteComment(commentId);
    return { message: result }
  }
}
