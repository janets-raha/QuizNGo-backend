import * as Mongoose from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "./category.model";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel("Category") private readonly categoryModel: Model<Category>,
  ) { }

  async createCategory(name: string) {
    const newCategory = new this.categoryModel({ name });
    const result = await newCategory.save();
    return result.id;
  }

  async showCategory() {
    const result = await this.categoryModel.find().exec();
    return result.map(cat => cat.name);
  }

  async showCategories() {
    const result = await this.categoryModel
      .find({})
      .sort({ name: 1 })
      .exec();
    return result.map(cat => ({
      value: cat._id,
      text: cat.name,
    }));
  }

  async update(catId: Mongoose.Schema.Types.ObjectId, name: string) {
    const category = await this.categoryModel.findOne({ _id: catId }).exec();
    if (!category) {
      throw new NotFoundException("Category not found");
    } else {
      category.name = name;
      category.save();
      return { id: category._id, name: category.name };
    }
  }

  async delete(catId: Mongoose.Schema.Types.ObjectId) {
    const category = await this.categoryModel.deleteOne({ _id: catId }).exec();
    if (category.deletedCount === 0) {
      throw new NotFoundException("Category not found");
    } else {
      return "Category successfully deleted";
    }
  }
}
