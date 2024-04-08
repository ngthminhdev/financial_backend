import {createParamDecorator, ExecutionContext, HttpStatus, Logger, SetMetadata} from '@nestjs/common';

import {JwtService} from '@nestjs/jwt';
import {ExceptionResponse} from "../exceptions/common.exception";
import {DEVICE_METADATA} from "../constants";

export const GetUserIdFromToken = createParamDecorator<string>(async (data: unknown, ctx: ExecutionContext) => {
    try {
        const request = ctx.switchToHttp().getRequest();
        const jwt = new JwtService();
        const bearer = request.headers.authorization;
        if (!bearer) {
            throw new ExceptionResponse(HttpStatus.UNAUTHORIZED, 'Xác thực thất bại!');
        }
        const token = bearer.split(' ')[1];
        // const payload: any = jwt.decode(token);
        const payload = jwt.verify(token, {secret: process.env.ACCESS_TOKEN_SECRET})
        return payload.userId;
    } catch (e) {
        new Logger('ErrorService').error(e)
        throw new ExceptionResponse(HttpStatus.UNAUTHORIZED, 'Xác thực thất bại!');
    }
});

export const GetToken = createParamDecorator<string>(async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const bearer = request?.headers?.authorization;

    if (!bearer) {
        throw new ExceptionResponse(HttpStatus.UNAUTHORIZED, 'Xác thực thất bại!');
    }
    return bearer.split(' ')[1];
});

export const LoginMetadata = () => SetMetadata(DEVICE_METADATA, true);
