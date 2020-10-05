import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async findAll(language: string): Promise<ProductDto[]> {
    return this.productModel
      .aggregate<ProductDto>([
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
  }
}
