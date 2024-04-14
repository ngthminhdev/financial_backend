export class BaseResponse {
  readonly status: number;
  readonly message: string;
  readonly data: any;

  constructor({ status, message, data }: Partial<BaseResponse>) {
    this.status = status || 200;
    this.message = message || 'Thành công';
    this.data = data || null;
  }
}


export class ListResponse {
  readonly status: number;
  readonly skip: number;
  readonly total: number;
  readonly message: string;
  readonly data: any;

  constructor({ status, message, data, skip, total }: Partial<ListResponse>) {
    this.status = status || 200;
    this.skip = skip || 0;
    this.total = total || 0;
    this.message = message || 'Thành công';
    this.data = data || null;
  }
}
