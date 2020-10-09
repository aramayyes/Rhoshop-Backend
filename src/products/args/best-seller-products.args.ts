import { IsInt, Min } from 'class-validator';

export class BestSellerProductsArgs {
  @IsInt()
  @Min(1)
  count: number;
  language?: string;
}
