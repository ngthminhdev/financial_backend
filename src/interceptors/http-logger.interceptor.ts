import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import {Observable} from 'rxjs';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
    private logger = new Logger('HTTP Logger');

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const {ip, method, originalUrl, body = {}, query = {}} = req;
        this.logger.log(`url:${originalUrl}, method:${method}, ip:${ip}, body:${JSON.stringify(body, null, 1)}, query:${JSON.stringify(query, null, 1)}`);
        return next.handle();
    }
}
