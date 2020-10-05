import { IsMongoId } from 'class-validator';

export class ProductArgs {
  @IsMongoId()
  id: string;

  language?: string;
}
