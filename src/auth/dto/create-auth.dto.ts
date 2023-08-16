import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAuthLogInDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class CreateAuthSingUpDto extends CreateAuthLogInDto {
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}
