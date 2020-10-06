import { SignInInput } from '../../graphql';
import { IsNotEmpty } from 'class-validator';

export class SignInDto extends SignInInput {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
