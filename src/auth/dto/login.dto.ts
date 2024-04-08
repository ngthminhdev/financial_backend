import {IsString} from "class-validator";

export class LoginDto {
  @IsString()
  account_name: string;

  @IsString()
  password: string;
}
