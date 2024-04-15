import {IsString} from "class-validator";
import {GetListDto} from "src/utils/utils.dto";

export class TransactionListDto extends GetListDto {
  @IsString()
  wallet_id: string;
}
