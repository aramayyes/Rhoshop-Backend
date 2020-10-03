import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './shemas/category.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: Category) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async getAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }
}
