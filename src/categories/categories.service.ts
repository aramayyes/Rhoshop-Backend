import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDto } from './dto';
import { Category } from './shemas';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  /**
   * Finds categories with given ids.
   * @param ids Ids of wanted categories.
   * @param language 'ru' for russian localization and 'en' for english.
   */
  async findByIds(
    ids: readonly string[],
    language: string,
  ): Promise<CategoryDto[]> {
    return this.categoryModel
      .aggregate<CategoryDto>([
        {
          $match: {
            _id: { $in: ids.map(id => new Types.ObjectId(id)) },
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

  /**
   * Finds all categories.
   * @param language 'ru' for russian localization and 'en' for english.
   */
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
