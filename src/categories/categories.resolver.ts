import { Args, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';

@Resolver()
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query('categories')
  async getCategories(
    @Args('language') language: string,
  ): Promise<CategoryDto[]> {
    return this.categoriesService.findAll(language);
  }
}
