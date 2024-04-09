import { BaseResponse } from '../../utils/utils.response';

export class RegisterResponse {
  user_id: number;

  constructor(data: any) {
    this.user_id = data?.user_id || 0;
  }
}

export class RegisterSwagger extends BaseResponse {
  data: RegisterResponse;
}
