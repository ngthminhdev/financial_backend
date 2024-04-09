import {HttpStatus, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {TimeToLive} from 'src/enums';
import {ExceptionResponse} from 'src/exceptions/common.exception';

import {IUser} from 'src/postgresql/interfaces/user.interface';
import {PostgresqlService} from 'src/postgresql/postgresql.service';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly postgresService: PostgresqlService,
  ) {}

  generateAccessToken(
    userId: string,
    accountName: string,
    role: number,
    permissions?: string[],
  ): string {
    return this.jwtService.sign(
      {
        userId,
        accountName,
        role,
        permissions,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: TimeToLive.OneDay,
      },
    );
  }

  async register(data: RegisterDto): Promise<any> {
    const {
      account_name: accountName,
      user_name: userName,
      email,
      password,
      confirm_password: confirmPassword,
    } = data;

    const [ isUserExists ] = await this.postgresService.query<IUser>(`SELECT * FROM public.user WHERE account_name = $1`, [accountName]);

    if (isUserExists) {
      throw new ExceptionResponse(HttpStatus.CONFLICT, 'Tài khoản đã tồn tại');
    }

    if (password != confirmPassword) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Nhập lại mật khẩu không chính xác');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await this.postgresService.query(`
      INSERT INTO public.user (account_name, user_name, email, password)
      VALUES($1, $2, $3, $4)
    `, [accountName, userName, email, hashPassword]);

    return null;
  }

  async login(body: LoginDto) {
    const {account_name: accountName, password} = body;

    const [user] = await this.postgresService.query<IUser>(`SELECT * FROM public.user WHERE account_name = $1`, [accountName]);


    if (!user) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Tài khoản chưa được đăng ký',);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new ExceptionResponse(HttpStatus.BAD_REQUEST, 'Tài khoản / mật khẩu không chính xác');
    }

    delete user.password;

    const accessToken = this.generateAccessToken(
      user.id,
      user.account_name,
      user.role,
      user.permissions,
    );
    return {
      ...user,
      accessToken,
    };
  }
}
