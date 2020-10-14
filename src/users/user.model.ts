import * as Mongoose from "mongoose";

export const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [6, "Nom trop court"],
  },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  favorites: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Quizz" }],
  score: { type: Number, default: 0 },
  role: { type: String, default: "user" },
});

export interface User extends Mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
  favorites: [Mongoose.Schema.Types.ObjectId];
  score: Number;
  role: string;
}
