import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from './question.model';
import { QuizzModule } from 'src/quizz/quizz.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Question', schema: QuestionSchema }]),
        QuizzModule
    ],
    controllers: [
        QuestionController,
    ],
    providers: [
        QuestionService,
    ],
    exports: [
        QuestionService, MongooseModule
    ]
})
export class QuestionModule { }
