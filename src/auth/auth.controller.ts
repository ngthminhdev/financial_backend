import {
  Body,
  Controller, HttpStatus, Post,
  Res
} from '@nestjs/common';
import {Response} from 'express';
import {CatchException} from 'src/exceptions/common.exception';
import {BaseResponse} from 'src/utils/utils.response';
import {AuthService} from './auth.service';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto, @Res() res: Response) {
    try {
      const data = await this.authService.register(body);
      return res
        .status(HttpStatus.CREATED)
        .send(new BaseResponse({ data, message: 'Đăng ký thành công' }));
    } catch (e) {
      throw new CatchException(e);
    }
  }

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    try {
      const data = await this.authService.login(body);
      return res.status(HttpStatus.OK).send(new BaseResponse({ data }));
    } catch (e) {
      throw new CatchException(e);
    }
  }

}
