import * as Mongoose from 'mongoose';
import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { QuizzService } from './quizz.service';

@Controller('quizz')
export class QuizzController {
  constructor(private readonly quizzService: QuizzService) {
  }

  @Post()
  async addQuizz(
    @Body('name') name: string,
    @Body('category') category: Mongoose.Schema.Types.ObjectId,
    @Body('difficulty') difficulty: String,
    @Body('bonus_time') bonus_time: Number,
    @Body('bonus_xp') bonus_xp: Number,
    @Body('is_published') is_published: Boolean) {
    const result = await this.quizzService.createQuizz(name, category, difficulty, bonus_time, bonus_xp, is_published);
    return { id: result };
  }

  @Get()
  async showAllQuizz() {
    const result = await this.quizzService.showQuizzes();
    return result;
  }

  @Get(':id')
  async showOneQuizz(@Param('id') quizzId: Mongoose.Schema.Types.ObjectId) {
    const result = await this.quizzService.showOneQuizz(quizzId);
    return result;
  }

  @Patch(':id')
  async updateQuizz(@Param('id') quizzId: Mongoose.Schema.Types.ObjectId,
    @Body('name') name: string,
    @Body('category') category: Mongoose.Schema.Types.ObjectId,
    @Body('difficulty') difficulty: String,
    @Body('bonus_time') bonus_time: Number,
    @Body('bonus_xp') bonus_xp: Number,
    @Body('avg_rating') avg_rating: Number,
    @Body('is_published') is_published: Boolean
  ) {
    const result = await this.quizzService.update(quizzId,
      name,
      category,
      difficulty,
      bonus_time,
      bonus_xp,
      avg_rating,
      is_published);
    return { message: result };
  }

  @Delete(':id')
  async deleteQuizz(@Param('id') quizzId: Mongoose.Schema.Types.ObjectId) {
    const result = await this.quizzService.delete(quizzId);
    return { message: result };
  }

  @Post('/filter')
  async filter(
    @Body('field') field: string,
    @Body('query') query: string,
  ) {
    const result = await this.quizzService.filter(field, query);
    return result
  }

  @Post('/search')
  async search(
    @Body('query') query: string,
  ) {
    const result = await this.quizzService.search(query);
    return result
  }

  @Post('/sort')
  async sort(
    @Body('sort') sort: string,
  ) {
    const result = await this.quizzService.sort(sort);
    return result
  }
}
