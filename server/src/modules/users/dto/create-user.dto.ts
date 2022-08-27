import { IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @MinLength(4)
  username: string;
  @IsString()
  @MinLength(4)
  password: string;
}
