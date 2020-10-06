import * as Mongoose from 'mongoose';


export const QuizzSchema = new Mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: Mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  difficulty: { type: String, required: true },
  bonus_time: { type: Number, required: true },
  bonus_xp: { type: Number, required: true },
  avg_rating: { type: Number, default: 0 },
  questions: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Question' }],

});

export interface Quizz extends Mongoose.Document {
  name: string;
  category: Mongoose.Schema.Types.ObjectId;
  difficulty: String;
  bonus_time: Number;
  bonus_xp: Number;
  avg_rating: Number;
  questions: [Mongoose.Schema.Types.ObjectId];
}
