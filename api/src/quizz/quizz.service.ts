import * as Mongoose from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quizz } from './quizz.model';

@Injectable()
export class QuizzService {
  constructor(@InjectModel('Quizz') private readonly quizzModel: Model<Quizz>) {
  }

  async createQuizz(
    name: string,
    category: Mongoose.Schema.Types.ObjectId,
    difficulty: String,
    bonus_time: Number,
    bonus_xp: Number,) {
    const newQuizz = new this.quizzModel({ name, category, difficulty, bonus_time, bonus_xp });
    const result = await newQuizz.save();
    return result.id;
  }

  async showQuizzes() {
    const quizzes = await this.quizzModel.find().exec();
    return quizzes.map(quiz => ({
      id: quiz._id,
      name: quiz.name,
      category: quiz.category,
      difficulty: quiz.difficulty,
      bonus_time: quiz.bonus_time,
      bonus_xp: quiz.bonus_xp,
      avg_rating: quiz.avg_rating,
      questions: quiz.questions
    }))
  }

  async showOneQuizz(id: Mongoose.Schema.Types.ObjectId) {
    const quiz = await this.quizzModel.findById(id).exec();
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    } else {
      return {
        id: quiz._id,
        name: quiz.name,
        category: quiz.category,
        difficulty: quiz.difficulty,
        bonus_time: quiz.bonus_time,
        bonus_xp: quiz.bonus_xp,
        avg_rating: quiz.avg_rating,
        questions: quiz.questions
      }
    }
  }

  async update(
    id: Mongoose.Schema.Types.ObjectId,
    name: string,
    category: Mongoose.Schema.Types.ObjectId,
    difficulty: String,
    bonus_time: Number,
    bonus_xp: Number,
    avg_rating: Number,
    questions: [Mongoose.Schema.Types.ObjectId]
  ) {
    const quiz = await this.quizzModel.findById(id).exec();
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    } else {
      if (name) {
        quiz.name = name
      }
      if (category) {
        quiz.category = category
      }
      if (difficulty) {
        quiz.difficulty = difficulty
      }
      if (bonus_time) {
        quiz.bonus_time = bonus_time
      }
      if (bonus_xp) {
        quiz.bonus_xp = bonus_xp
      }
      if (avg_rating) {
        quiz.avg_rating = avg_rating
      }
      if (questions) {
        quiz.questions = questions
      }
      quiz.save()
      return " Quiz successfully updated"
    }

  }

  async delete(id: Mongoose.Schema.Types.ObjectId) {
    const quiz = await this.quizzModel.deleteOne({ _id: id }).exec();
    // also delete the questions

    if (quiz.deletedCount === 0) {
      throw new NotFoundException('Quiz not found');
    } else {
      return "Quiz successfully deleted"
    }
  }
}
