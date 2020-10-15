import { QuizzController } from "./quizz.controller";
import { QuizzService } from "./quizz.service";
import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { QuizzSchema } from "./quizz.model";
import { QuestionModule } from "src/question/question.module";
import { DonequizModule } from "src/donequiz/donequiz.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Quizz", schema: QuizzSchema }]),
    forwardRef(() => QuestionModule),
    DonequizModule,
  ],
  controllers: [QuizzController],
  providers: [QuizzService],
  exports: [MongooseModule, QuizzService],
})
export class QuizzModule {}
