import * as Mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './question.model';
import { Quizz } from '../quizz/quizz.model'

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel('Question') private readonly questionModel: Model<Question>,
    @InjectModel('Quizz') private readonly quizzModel: Model<Quizz>) {
  }

  async createQuestion(
    quizz_id: Mongoose.Schema.Types.ObjectId,
    xps: Number,
    question: String,
    answers: [Object]
  ) {
    const newQuestion = new this.questionModel({ quizz_id, xps, question, answers });
    const result = await newQuestion.save();
    if (result) {
      const quiz = await this.quizzModel.findById(quizz_id).exec();
      quiz.questions.push(result._id);
      quiz.save();
      return result._id
    }
  }

  async showQuestions(quizz_id: Mongoose.Schema.Types.ObjectId) {
    const questions = await this.questionModel.find({ quizz_id: quizz_id }).exec();
    return questions
  }
}
