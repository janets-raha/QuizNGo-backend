import { DonequizService } from './donequiz.service';
import { DonequizController } from './donequiz.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DonequizSchema } from './donequiz.model';
import { UsersModule } from 'src/users/users.module';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Donequiz', schema: DonequizSchema }]),
        UsersModule
    ],
    controllers: [
        DonequizController,
    ],
    providers: [
        DonequizService,
    ],
})
export class DonequizModule { }
