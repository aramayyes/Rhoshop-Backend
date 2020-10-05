import { Injectable, Scope } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import * as DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class CategoryLoaders {
  constructor(private readonly categoryService: CategoriesService) {}

  public readonly findByIds = new DataLoader<string, CategoryDto>(async ids => {
    return await this.categoryService.findByIds(ids);
  });
}
