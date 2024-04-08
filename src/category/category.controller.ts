import {Controller, Get, HttpStatus, Res} from '@nestjs/common';
import {Response} from 'express';
import {CatchException} from 'src/exceptions/common.exception';
import {GetUserIdFromToken} from 'src/utils/utils.decorators';
import {BaseResponse} from 'src/utils/utils.response';
import {CategoryService} from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getList(
    @GetUserIdFromToken() userId: string,
    @Res() res: Response
  ) {
    try {
      const data = await this.categoryService.getList();
      return res
        .status(HttpStatus.OK)
        .send(new BaseResponse({data}));
    } catch (e) {
      throw new CatchException(e);
    }
  }
}
