import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @MinLength(1)
  text: string;
}

export class CreateLikeDto {
  @IsNotEmpty()
  @MinLength(5)
  _id: string;
}
