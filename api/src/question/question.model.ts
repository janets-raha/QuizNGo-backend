import * as Mongoose from 'mongoose';


export const QuestionSchema = new Mongoose.Schema({
  quizz_id: { type: Mongoose.Schema.Types.ObjectId, ref: 'Quizz', required: true },
  xps: { type: Number, required: true },
  question: { type: String, required: true },
  answers: [{ type: Object, required: true }],

});

export interface Question extends Mongoose.Document {
  quizz_id: Mongoose.Schema.Types.ObjectId;
  xps: Number;
  question: String;
  answers: [Object];
}
