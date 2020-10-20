import * as Mongoose from "mongoose";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { DonequizService } from "./donequiz.service";

@Controller("donequiz")
export class DonequizController {
  constructor(private readonly DonequizService: DonequizService) {}

  @Post()
  async addEntry(
    @Body("user_id") userId: Mongoose.Schema.Types.ObjectId,
    @Body("quizz_id") quizId: Mongoose.Schema.Types.ObjectId,
    @Body("score") score: Number,
    @Body("success_rate") success_rate: Number,
  ) {
    const result = await this.DonequizService.enterQuiz(
      userId,
      quizId,
      score,
      success_rate,
    );
    return result;
  }

  @Get()
  async getAll() {
    const result = await this.DonequizService.getAllQuiz();
    return result;
  }

  @Get("user/:id")
  async getUserQuiz(@Param("id") userId: Mongoose.Schema.Types.ObjectId) {
    const result = await this.DonequizService.getOneUserQuiz(userId);
    return result;
  }

  @Get("rank/:id")
  async getUserRank(@Param("id") userId: Mongoose.Schema.Types.ObjectId) {
    const result = await this.DonequizService.getOneUserRank(userId);
    return result;
  }

  // @Get(":id")
  // async getOneQuiz(@Param("id") quizId: Mongoose.Schema.Types.ObjectId) {
  //   console.log("YYYYY");
  //   const result = await this.DonequizService.getOneQuiz(quizId);
  //   return result;
  // }

  @Patch(":id")
  async update(
    @Param("id") quizId: Mongoose.Schema.Types.ObjectId,
    @Body("score") score: Number,
    @Body("success_rate") success_rate: Number,
  ) {
    const result = await this.DonequizService.updateQuiz(
      quizId,
      score,
      success_rate,
    );
    return result;
  }

  @Delete(":id")
  async delete(@Param("id") quizId: Mongoose.Schema.Types.ObjectId) {
    const result = await this.DonequizService.delete(quizId);
    return { message: result };
  }
}
