import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './schemas';
import { ProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  /**
   * Checks whether a product with given id exists.
   * @param id Id of the product to check existence for.
   */
  async exists(id: string): Promise<boolean> {
    return this.productModel.exists({ _id: id });
  }

  /**
   * Finds products with given ids.
   * @param ids Ids of wanted products.
   * @param language 'ru' for russian localization and 'en' for english.
   */
  async findByIds(
    ids: readonly string[],
    language: string,
  ): Promise<ProductDto[]> {
    return this.productModel
      .aggregate<ProductDto>([
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

  /**
   * Finds products for given category if it is given and all products otherwise.
   * @param category Id of the category to find products of that type.
   * @param name Name pattern to filter products.
   * @param language 'ru' for russian localization and 'en' for english.
   * @param ids Ids of wanted products.
   */
  async findMany(
    language: string,
    name?: string,
    category?: string,
    ids?: string[],
  ): Promise<ProductDto[]> {
    const pipeline: any[] = [];
    if (ids) {
      pipeline.push({
        $match: {
          _id: { $in: ids.map(id => new Types.ObjectId(id)) },
        },
      });
    }

    if (name) {
      pipeline.push({
        $match: {
          name: {
            $regex: `.*${name}.*`,
            $options: 'i',
          },
        },
      });
    }

    if (category) {
      pipeline.push({
        $match: {
          category: new Types.ObjectId(category),
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

  /**
   * Finds random products.
   * @param count How many products to find.
   * @param language 'ru' for russian localization and 'en' for english.
   */
  async findRandom(count: number, language: string): Promise<ProductDto[]> {
    return this.productModel.aggregate([
      {
        $sample: {
          size: count,
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
    ]);
  }

  /**
   * Finds a product with given id.
   * @param id Id of the wanted product.
   * @param language 'ru' for russian localization and 'en' for english.
   */
  async findById(id: string, language: string): Promise<ProductDto> {
    const products: ProductDto[] = await this.productModel
      .aggregate<ProductDto>([
        {
          $match: {
            _id: new Types.ObjectId(id),
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
