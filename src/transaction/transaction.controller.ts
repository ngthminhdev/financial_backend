import {Body, Controller, Get, HttpStatus, Post, Query, Res} from '@nestjs/common';
import {Response} from 'express';
import {CatchException} from 'src/exceptions/common.exception';
import {GetUserIdFromToken} from 'src/utils/utils.decorators';
import {BaseResponse, ListResponse} from 'src/utils/utils.response';
import {CreateTransactionDto} from './dto/create-transaction.dto';
import {TransactionListDto} from './dto/get-list.dto';
import {TransactionService} from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(
    @GetUserIdFromToken() userId: string,
    @Body() body: CreateTransactionDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.transactionService.create(userId, body);
      return res
        .status(HttpStatus.CREATED)
        .send(new BaseResponse({data, message: 'Tạo giao dịch thành công'}));
    } catch (e) {
      throw new CatchException(e);
    }
  }

  @Get()
  async getList(
    @GetUserIdFromToken() userId: string,
    @Query() query: TransactionListDto,
    @Res() res: Response,
  ) {
    try {
      const { skip, total, data } = await this.transactionService.getList(userId, query);
      return res
        .status(HttpStatus.OK)
        .send(new ListResponse({skip, total, data}));
    } catch (e) {
      throw new CatchException(e);
    }
  }

  @Get('category-group')
  async getCategoryTransaction(
    @GetUserIdFromToken() userId: string,
    @Query() query: TransactionListDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.transactionService.getCategoryTransaction(userId, query);
      return res
        .status(HttpStatus.OK)
        .send(new BaseResponse({data}));
    } catch (e) {
      throw new CatchException(e);
    }
  }

  @Get('in-out')
  async getInOutTransaction(
    @GetUserIdFromToken() userId: string,
    @Query() query: TransactionListDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.transactionService.getInOutTransaction(userId, query);
      return res
        .status(HttpStatus.OK)
        .send(new BaseResponse({data}));
    } catch (e) {
      throw new CatchException(e);
    }
  }
}
