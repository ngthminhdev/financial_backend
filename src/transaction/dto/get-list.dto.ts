import {GetListDto} from "src/utils/utils.dto";

export class TransactionListDto extends GetListDto {
  wallet_id: string;

  type?: string;

  from_date?: string;
  
  to_date?: string;
}
