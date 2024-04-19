import {HttpStatus, Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {ValidationError} from 'class-validator';
import * as cookieParser from 'cookie-parser';
import {join} from 'path';
import * as _ from 'lodash';

import { HttpLoggerInterceptor } from './interceptors/http-logger.interceptor';
import { ValidationFilter } from './filters/validation.filter';
import { ExceptionResponse } from './exceptions/common.exception';
import { UtilCommonTemplate } from './utils/utils.common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger(process.env.NODE_ENV == '.local' ? 'Development' : 'Production', {
    timestamp: true,
  });
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
  });
    // lodash global
    global._ = _;

      // app.enableCors({
  //   origin: process.env.WHITELIST_IPS.split(','), // add your IP whitelist here
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  //   credentials: true,
  //   allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  // });

  app.setGlobalPrefix(process.env.API_PREFIX);
  app.enableCors({origin: '*'});
  app.use(cookieParser());
  app.useGlobalInterceptors(new HttpLoggerInterceptor());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory(errors: ValidationError[]) {
        return new ExceptionResponse(
          HttpStatus.BAD_REQUEST,
          UtilCommonTemplate.getMessageValidator(errors),
        );
      },
    }),
  );

  await app.listen(parseInt(process.env.SERVER_PORT), '0.0.0.0').then(() => {
    logger.verbose(
      `Server is running at ${process.env.SERVER_HOST}:${process.env.SERVER_PORT} --version: 0.0.8 `,
    );
  });
}
bootstrap();
