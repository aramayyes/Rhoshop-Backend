import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDto } from './dto/category.dto';
import { Category } from './shemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async findByIds(ids: readonly string[]): Promise<CategoryDto[]> {
    return this.categoryModel
      .aggregate<CategoryDto>([
        {
          $match: {
            _id: { $in: ids.map(id => new mongoose.Types.ObjectId(id)) },
          },
        },
        {
          $project: {
            id: '$_id',
            _id: 0,
            name: '$name',
            image: 1,
          },
        },
      ])
      .exec();
  }

  async findAll(language: string): Promise<CategoryDto[]> {
    return this.categoryModel
      .aggregate<CategoryDto>([
        {
          $sort: {
            order: 1,
          },
        },
        {
          $project: {
            id: '$_id',
            _id: 0,
            name: language == 'ru' ? '$nameRu' : '$name',
            image: 1,
          },
        },
      ])
      .exec();
  }
}
