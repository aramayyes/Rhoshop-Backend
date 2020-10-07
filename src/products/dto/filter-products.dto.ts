import { FilterProductsInput } from '../../graphql';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class FilterProductsDto extends FilterProductsInput {
  @IsOptional()
  @IsMongoId()
  category?: string;

  @IsOptional()
  @IsNotEmpty()
  name?: string;
}
