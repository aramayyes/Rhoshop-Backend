import { Args, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto';
import { CategoriesArgs } from './args';

@Resolver()
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query('categories')
  async getCategories(@Args() args: CategoriesArgs): Promise<CategoryDto[]> {
    return this.categoriesService.findAll(args.language);
  }
}
