import * as Mongoose from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './question.model';
import { Quizz } from '../quizz/quizz.model';



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
      return result._id
    }
  }

  async createQuestions(
    questions: [Question]
  ) {
    questions.map(async quest => {
      const newQuestion = new this.questionModel({ quizz_id: quest.quizz_id, xps: quest.xps, question: quest.question, answers: quest.answers });
      const result = await newQuestion.save();
    })
    return questions.length + " question(s) added";
  }

  async showQuestions(quizz_id: Mongoose.Schema.Types.ObjectId) {
    const questions = await this.questionModel.find({ quizz_id: quizz_id }).exec();
    return questions.map(quest => ({
      id: quest._id,
      quizz_id: quest.quizz_id,
      xps: quest.xps,
      question: quest.question,
      answers: quest.answers
    }))
  }

  async showAllQuestions() {
    const questions = await this.questionModel.find().exec();
    return questions.map(quest => ({
      id: quest._id,
      quizz_id: quest.quizz_id,
      xps: quest.xps,
      question: quest.question,
      answers: quest.answers
    }))
  }


  /*   async update(
      quest_id: Mongoose.Schema.Types.ObjectId,
      xps: Number,
      question: String,
      answers: [Object]) {
      const newquestion = await this.questionModel.findById(quest_id).exec();
      if (!newquestion) {
        throw new NotFoundException('Question not found');
      } else {
        if (xps) {
          newquestion.xps = xps
        }
        if (question) {
          newquestion.question = question
        }
        if (answers) {
          newquestion.answers = answers
        }
        return {
          id: newquestion._id,
          quizz_id: newquestion.quizz_id,
          xps: newquestion.xps,
          question: newquestion.question,
          answers: newquestion.answers
        };
      }
    } */


  async updateQuestions(
    quizz_id: Mongoose.Schema.Types.ObjectId,
    questions: [Question]) {
    questions.map(async quest => {
      const newquestion = await this.questionModel.findById(quest.id).exec();
      if (!newquestion) {
        throw new NotFoundException('Question not found');
      } else {
        newquestion.xps = quest.xps;
        newquestion.question = quest.question;
        newquestion.answers = quest.answers;
        newquestion.save()
      }
    })
    return questions.length + " questions modified !"

  }


  async delete(quest_id: Mongoose.Schema.Types.ObjectId,) {
    const quest = await this.questionModel.deleteOne({ _id: quest_id }).exec();
    if (quest.deletedCount === 0) {
      throw new NotFoundException('Question not found');
    } else {
      return "Question successfully deleted"
    }
  }



}
