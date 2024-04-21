import {GetListDto} from "src/utils/utils.dto";

export class WalletDto extends GetListDto {
  type?: string;
  wallet_id?: string;
  date?: string;
}
