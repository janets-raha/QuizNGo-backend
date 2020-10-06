import * as Mongoose from 'mongoose';

export const UserSchema = new Mongoose.Schema ({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  favorites: { type: Array },
  score: { type: Number },
});

export interface User extends Mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
  favorites: [];
  score: number;
}