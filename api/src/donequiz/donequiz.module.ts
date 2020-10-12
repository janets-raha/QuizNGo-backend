import { DonequizService } from './donequiz.service';
import { DonequizController } from './donequiz.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DonequizSchema } from './donequiz.model';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Donequiz', schema: DonequizSchema }])
    ],
    controllers: [
        DonequizController,
    ],
    providers: [
        DonequizService,
    ],
})
export class DonequizModule { }
