import * as Mongoose from 'mongoose';
import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {
  }

  @Post()
  async addQuestion(
    @Body('quizz_id') quizz_id: Mongoose.Schema.Types.ObjectId,
    @Body('xps') xps: Number,
    @Body('question') question: String,
    @Body('answers') answers: [Object]
  ) {
    const result = await this.questionService.createQuestion(quizz_id, xps, question, answers);
    return { id: result };
  }

  @Get(':id')
  async showQuizQuestions(@Param('id') id: Mongoose.Schema.Types.ObjectId) {
    const result = await this.questionService.showQuestions(id)
    return result;
  }

  @Get()
  async showQuestions() {
    const result = await this.questionService.showAllQuestions()
    return result;
  }

  @Patch(':id')
  async updateQuestion(
    @Param('id') id: Mongoose.Schema.Types.ObjectId,
    @Body('xps') xps: Number,
    @Body('question') question: String,
    @Body('answers') answers: [Object]) {
    const result = await this.questionService.update(id, xps, question, answers)
    return result;
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: Mongoose.Schema.Types.ObjectId) {
    const result = await this.questionService.delete(id);
    return { message: result }
  }

}
