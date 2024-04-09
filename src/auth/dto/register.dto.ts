import {IsEmail, IsString, MaxLength, MinLength} from "class-validator";

export class RegisterDto {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  account_name: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  user_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  confirm_password: string;
}
