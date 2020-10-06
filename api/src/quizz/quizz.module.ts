import { QuizzController } from './quizz.controller';
import { QuizzService } from './quizz.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizzSchema } from './quizz.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Quizz', schema: QuizzSchema }]),
    ],
    controllers: [
        QuizzController,
    ],
    providers: [
        QuizzService,
    ],
    exports: [
        MongooseModule, QuizzService
    ]
})
export class QuizzModule { }
