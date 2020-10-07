import { Injectable, Scope } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto';
import * as DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class ProductLoaders {
  constructor(private readonly productsService: ProductsService) {}

  public readonly findByIds = new DataLoader<
    { id: string; language: string },
    ProductDto,
    string
  >(
    async ids => {
      const products = await this.productsService.findByIds(
        ids.map(({ id }) => id),
        ids[0].language,
      );

      return ids.map(({ id }) => products.find(p => p.id == id));
    },
    {
      cacheKeyFn: ({ id }) => id,
    },
  );
}
