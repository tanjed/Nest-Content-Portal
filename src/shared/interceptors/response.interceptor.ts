import { CallHandler, ExecutionContext, HttpStatus, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export class ApiResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(map(
      (data: any) => {
        let message = 'Success';
        if (data?.statusCode) {
          response.status(data.statusCode);
          delete data.statusCode;
        }

        if (data?.message) {
          message = data.message;
          delete data.message;
        }

        return {
          success: response.statusCode >= 200 && response.statusCode < 300,
          message: message,
          data,
        };
      }
    ));
  }
}
