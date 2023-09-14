import {IsNotEmpty, MinLength} from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @MinLength(1)
  text: string;
}

export class VoteDto {
  @IsNotEmpty()
  @MinLength(5)
  _id: string;
}

export class EditDto {
  @IsNotEmpty()
  @MinLength(1)
  text: string;

  @IsNotEmpty()
  @MinLength(5)
  _id: string;
}