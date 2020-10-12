import * as Mongoose from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Donequiz } from './donequiz.model';

@Injectable()
export class DonequizService {
  constructor(
    @InjectModel('Donequiz') private readonly donequizModel: Model<Donequiz>
  ) {
  }

  async enterQuiz(
    user_id: Mongoose.Schema.Types.ObjectId,
    quizz_id: Mongoose.Schema.Types.ObjectId,
    score: Number
  ) {
    const newEntry = new this.donequizModel({ user_id, quizz_id, score });
    const result = await newEntry.save();
    if (result) {
      return result._id
    } else {
      throw new Error("Erreur lors de la création !")
    }
  }

  async getAllQuiz() {
    const quizz = await this.donequizModel.find().exec();
    return quizz.map(quiz => (
      {
        id: quiz._id,
        user_id: quiz.user_id,
        quizz_id: quiz.quizz_id,
        score: quiz.score
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
        score: quiz.score
      }
    ))
  }

  async updateQuiz(id: Mongoose.Schema.Types.ObjectId, score: Number) {
    const quiz = await this.donequizModel.findById(id).exec();
    if (quiz) {
      quiz.score = score;
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
