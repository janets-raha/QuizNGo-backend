import * as Mongoose from 'mongoose';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RatingService } from './rating.service';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) { }

  @Post()
  async addRating(
    @Body('quizz_id') quizz_id: Mongoose.Schema.Types.ObjectId,
    @Body('user_id') user_id: Mongoose.Schema.Types.ObjectId,
    @Body('rating') rating: number,
  ) {
    const result = await this.ratingService.createRating(quizz_id, user_id, rating);
    return result
  }

  @Get()
  async getAllRatings() {
    const result = await this.ratingService.getRatings();
    return result
  }

  @Get(':id')
  async getavgRating(
    @Param('id') quizzId: Mongoose.Schema.Types.ObjectId
  ) {
    const result = this.ratingService.updateAvg(quizzId)
    return result
  }
}
