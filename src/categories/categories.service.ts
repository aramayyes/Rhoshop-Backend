import { Injectable } from '@nestjs/common';
import { Category } from './shemas/category.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: Category): Promise<Category> {
    const createdCat = new this.categoryModel(createCategoryDto);
    return createdCat.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
}
