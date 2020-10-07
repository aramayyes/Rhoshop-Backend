import { UpdateUserInput } from '../../graphql';
import { IsNotEmpty, MaxLength, MinLength, ValidateIf } from 'class-validator';

export class UpdateUserDto extends UpdateUserInput {
  @ValidateIf(o => o.password == null || o.name != null)
  @IsNotEmpty()
  @MaxLength(100)
  name?: string;

  @ValidateIf(o => o.name == null || o.password != null)
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password?: string;
}
