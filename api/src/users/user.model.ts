import * as Mongoose from 'mongoose';

export const UserSchema = new Mongoose.Schema ({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  favorites: { type: Array }, // type: Mongoose.Schema.Types.ObjectId, ref: 'Quizz', required: true
  score: { type: Number },
  role: { type: String, default: "user" },
});

export interface User extends Mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
  favorites: []; // Mongoose.Schema.Types.ObjectId
  score: number;
  role: string;
}