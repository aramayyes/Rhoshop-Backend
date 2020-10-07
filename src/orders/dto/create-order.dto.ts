import { CreateOrderInput } from '../../graphql';
import {
  IsHexColor,
  IsIn,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateOrderDto extends CreateOrderInput {
  @IsMongoId()
  product: string;

  @IsIn(['S', 'M', 'L', 'XL'])
  productSize: string;

  @IsNotEmpty()
  @Length(6, 6)
  @IsHexColor()
  productColor: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(20)
  productCount: number;
}
