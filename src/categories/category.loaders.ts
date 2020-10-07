import { Injectable, Scope } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto';
import * as DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class CategoryLoaders {
  constructor(private readonly categoryService: CategoriesService) {}

  public readonly findByIds = new DataLoader<
    { id: string; language: string },
    CategoryDto,
    string
  >(
    async ids => {
      const categories = await this.categoryService.findByIds(
        ids.map(({ id }) => id),
        ids[0].language,
      );

      return ids.map(({ id }) => categories.find(c => c.id == id));
    },
    {
      cacheKeyFn: ({ id }) => id,
    },
  );
}
