import { IsInt, Min } from 'class-validator';

export class NewProductsArgs {
  @IsInt()
  @Min(1)
  count: number;
  language?: string;
}
