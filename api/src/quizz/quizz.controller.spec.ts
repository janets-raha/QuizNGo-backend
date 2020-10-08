import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { QuizzService } from './quizz.service';
import { QuizzSchema, QuizzRef } from './quizz.model'
import { QuizzModule } from './quizz.module';
import { QuestionModule } from '../question/question.module'

const ObjectID = require('mongodb').ObjectID;
let mongod: MongoMemoryServer;

describe('QuizzController', () => {
  let module: TestingModule;
  let quizzService: QuizzService;

  afterEach(async () => {
    await module.close();
    await mongoose.disconnect();
    await mongod.stop();
  });

  beforeEach(async () => {
    mongod = new MongoMemoryServer()
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => ({
            uri: await mongod.getUri(),
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
          }),
        }),
        MongooseModule.forFeature([
          { name: QuizzRef, schema: QuizzSchema },
        ]),
        QuizzModule,
        QuestionModule
      ],
      providers: [QuizzService,],
    }).compile();
    quizzService = module.get(QuizzService);
  });

  it('Quizz service should be defined', () => {
    expect(quizzService).toBeDefined();
  });


  it('show one quizz should return object', async () => {
    const id: mongoose.Schema.Types.ObjectId = new ObjectID()
    const result = await quizzService.showOneQuizz(id);
    expect(typeof (result)).toBe('object');
  });


});