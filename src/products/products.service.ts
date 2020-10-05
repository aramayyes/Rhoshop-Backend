import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas';
import { ProductDto } from './dto';
import * as mongoose from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async findMany(category: string, language: string): Promise<ProductDto[]> {
    const pipeline: any[] = [];
    if (category) {
      pipeline.push({
        $match: {
          category: new mongoose.Types.ObjectId(category),
        },
      });
    }

    pipeline.push({
      $project: {
        id: '$_id',
        _id: 0,
        name: language == 'ru' ? '$nameRu' : '$name',
        description: language == 'ru' ? '$descriptionRu' : '$description',
        image: 1,
        category: 1,
        price: 1,
        oldPrice: 1,
        rating: 1,
        reviewsCount: 1,
      },
    });

    return this.productModel.aggregate<ProductDto>(pipeline).exec();
  }

  async findById(id: string, language: string): Promise<ProductDto> {
    const products: ProductDto[] = await this.productModel
      .aggregate<ProductDto>([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $project: {
            id: '$_id',
            _id: 0,
            name: language == 'ru' ? '$nameRu' : '$name',
            description: language == 'ru' ? '$descriptionRu' : '$description',
            image: 1,
            category: 1,
            price: 1,
            oldPrice: 1,
            rating: 1,
            reviewsCount: 1,
          },
        },
      ])
      .exec();

    if (products.length !== 0) {
      return products[0];
    } else {
      return null;
    }
  }
}
