import { FilterProductsInput } from '../../graphql';
import {
  ArrayNotEmpty,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class FilterProductsDto extends FilterProductsInput {
  @IsOptional()
  @IsMongoId()
  category?: string;

  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @ArrayNotEmpty()
  @IsMongoId({
    each: true,
  })
  ids?: string[];
}
