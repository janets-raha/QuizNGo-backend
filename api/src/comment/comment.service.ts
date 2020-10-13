import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose'
import { Model } from 'mongoose';
import { Comment } from './comment.model'

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>
  ) { }

  async createComment(
    user_id: Mongoose.Schema.Types.ObjectId,
    quizz_id: Mongoose.Schema.Types.ObjectId,
    comment: string,
  ) {
    const newComment = new this.commentModel({ user_id, quizz_id, comment })
    if (newComment) {
      newComment.save();
      return newComment._id
    } else {
      throw new Error('Error in comment creation !')
    }
  }

  async getComments() {
    const comments = await this.commentModel.find().exec()
    return comments.map(comment => ({
      id: comment._id,
      user_id: comment.user_id,
      quizz_id: comment.quizz_id,
      comment: comment.comment
    }))
  }

  async getQuizComment(
    quizzId: Mongoose.Schema.Types.ObjectId,
  ) {
    const comments = await this.commentModel.find({ quizz_id: quizzId }).populate('user_id').sort({ createdAt: "asc" }).exec();
    return comments.map(comment => ({
      id: comment._id,
      user_id: comment.user_id,
      quizz_id: comment.quizz_id,
      comment: comment.comment,
      created_at: comment.createdAt
    }))

  }

  async deleteComment(id: Mongoose.Schema.Types.ObjectId) {
    const comment = await this.commentModel.deleteOne({ _id: id }).exec();
    if (comment.deletedCount === 0) {
      throw new NotFoundException('Comment not found !')
    } else {
      return "Comment successfully deleted !"
    }
  }
}
