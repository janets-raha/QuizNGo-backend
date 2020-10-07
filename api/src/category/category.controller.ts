import { Controller, Body, Post, Get, Patch, Delete, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import * as Mongoose from 'mongoose';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {
  }

  @Post()
  async addCategory(@Body('name') name: string) {
    const result = await this.categoryService.createCategory(name);
    return { id: result };
  }

  @Get('/array')
  async showAllCategories() {
    const result = await this.categoryService.showCategory();
    return result;
  }

  @Get()
  async showCategories() {
    const result = await this.categoryService.showCategories();
    return result;
  }

  @Patch(':id')
  async updateCategory(
    @Param('id') categoryId: Mongoose.Schema.Types.ObjectId,
    @Body('name') name: string,
  ) {
    const result = await this.categoryService.update(categoryId, name);
    return result;
  }

  @Delete(':id')   // pour admin
  async deleteConcert(@Param('id') categoryId) {
    const result = await this.categoryService.delete(categoryId);
    return { message: result };
  }
}
