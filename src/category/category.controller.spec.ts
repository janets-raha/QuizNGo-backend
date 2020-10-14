import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { CategoryService } from './category.service';
import { CategorySchema, CategoryRef } from './category.model'
import { CategoryModule } from './category.module';

let mongod: MongoMemoryServer;

describe('CategoryController', () => {
  let module: TestingModule;
  let categoryService: CategoryService;

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
          { name: CategoryRef, schema: CategorySchema },
        ]),
        CategoryModule,
      ],
      providers: [CategoryService,],
    }).compile();
    categoryService = module.get(CategoryService);
  });

  it('Category service should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  it('create category should return data', async () => {
    const result = await categoryService.createCategory('Javascript');
    expect(result).toBeDefined();
  });

  it('show categories should return object', async () => {
    const result = await categoryService.showCategories();
    expect(typeof (result)).toBe('object');
  });


});