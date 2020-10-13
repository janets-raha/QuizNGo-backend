import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizzModule } from 'src/quizz/quizz.module';
import { UsersModule } from 'src/users/users.module';
import { CommentSchema } from './comment.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
        forwardRef(() => UsersModule),
        forwardRef(() => QuizzModule)
    ],
    controllers: [
        CommentController,
    ],
    providers: [
        CommentService,
    ],
})
export class CommentModule { }
