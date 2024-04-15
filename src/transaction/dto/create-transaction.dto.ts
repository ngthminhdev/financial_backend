import {IsEnum, IsNumber, IsString, MaxLength, Min} from "class-validator";
import {VALID_TRANSACTION, VALID_WALLET} from "../constants";

export class CreateTransactionDto {
  @IsNumber()
  @IsEnum(VALID_TRANSACTION)
  type: number;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  wallet_id: string;

  @IsString()
  goat_id: string;

  @IsString()
  category_id: string;

  @IsString()
  date: string;

  @IsString()
  @MaxLength(255)
  note: string;
}
