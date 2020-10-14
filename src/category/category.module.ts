import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './category.model';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    ],
    controllers: [
        CategoryController,],
    providers: [
        CategoryService,],
    exports: [
        MongooseModule, CategoryService
    ]
})
export class CategoryModule { }
