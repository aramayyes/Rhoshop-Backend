import { IsInt, Min } from 'class-validator';

export class FeaturedProductsArgs {
  @IsInt()
  @Min(1)
  count: number;
  language?: string;
}
