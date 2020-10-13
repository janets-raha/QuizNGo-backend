import * as Mongoose from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Donequiz } from './donequiz.model';
import { User } from 'src/users/user.model';

@Injectable()
export class DonequizService {
  constructor(
    @InjectModel('Donequiz') private readonly donequizModel: Model<Donequiz>,
    @InjectModel('User') private readonly userModel: Model<User>
  ) {
  }

  async enterQuiz(
    user_id: Mongoose.Schema.Types.ObjectId,
    quizz_id: Mongoose.Schema.Types.ObjectId,
    score: Number,
    success_rate: Number
  ) {
    const user = await this.userModel.findById(user_id).exec();
    const doneQuiz = await this.donequizModel.findOne({ user_id, quizz_id }).exec();
    if (doneQuiz) {
      if (doneQuiz.score < score) {
        doneQuiz.score = score;
        doneQuiz.success_rate = success_rate
        doneQuiz.save()
        return doneQuiz
      } else {
        return { message: "Previous score is higher" }
      }
    } else {
      const newEntry = new this.donequizModel({ user_id, quizz_id, score, success_rate });
      const result = await newEntry.save();
      if (result) {
        return result._id
      } else {
        throw new Error("Error in the creation !")
      }
    }

  }

  async getAllQuiz() {
    const quizz = await this.donequizModel.find().exec();
    return quizz.map(quiz => (
      {
        id: quiz._id,
        user_id: quiz.user_id,
        quizz_id: quiz.quizz_id,
        score: quiz.score,
        success_rate: quiz.success_rate
      }
    ))
  }

  async getOneUserQuiz(userId: Mongoose.Schema.Types.ObjectId) {
    const quizz = await this.donequizModel.find({ user_id: userId }).populate('quizz_id');
    return quizz.map(quiz => (
      {
        id: quiz._id,
        user_id: quiz.user_id,
        quizz_id: quiz.quizz_id,
        score: quiz.score,
        success_rate: quiz.success_rate
      }
    ))
  }

  async updateQuiz(id: Mongoose.Schema.Types.ObjectId, score: Number, success_rate: Number) {
    const quiz = await this.donequizModel.findById(id).exec();
    if (quiz) {
      if (score) {
        quiz.score = score;
      }
      if (success_rate) {
        quiz.success_rate = success_rate
      }
      quiz.save()
      return quiz
    } else {
      throw new NotFoundException("Quiz not found")
    }
  }

  async delete(id: Mongoose.Schema.Types.ObjectId) {
    const quiz = await this.donequizModel.deleteOne({ _id: id }).exec();
    if (quiz.deletedCount === 0) {
      throw new NotFoundException("Quiz not found");
    } else {
      return "Quiz successfully deleted !"
    }
  }

}
