import { ApiProperty } from '@nestjs/swagger';
import * as Mongoose from 'mongoose'

export class CreateUserDto {
  @ApiProperty({ description: "Nickname or Pseudo of the user" })
  name: string;
  @ApiProperty({ description: "Email address of the user" })
  email: string;
  @ApiProperty({ description: "Password of the user" })
  password: string;
  @ApiProperty({ description: "List of user favorite quizz (optional)" })
  favorites: [Mongoose.Schema.Types.ObjectId];
  @ApiProperty({ description: "Total XPs" })
  score: Number;
  @ApiProperty({ description: "User status (admin or user)" })
  role: string;
}