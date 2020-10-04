import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDto } from './dto/category.dto';
import { Category } from './shemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

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
