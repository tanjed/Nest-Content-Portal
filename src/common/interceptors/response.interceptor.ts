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
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => ({
        success: statusCode >= 200 && statusCode < 300,
        message: this.getMessage(statusCode),
        data: data,
      })),
    );
  }

  private getMessage(statusCode: number): string {
    switch (statusCode) {
      case HttpStatus.OK: return 'Success';
      case HttpStatus.CREATED: return 'Created successfully';
      case HttpStatus.ACCEPTED: return 'Accepted';
      case HttpStatus.NO_CONTENT: return 'Deleted successfully';
      default: return 'Success';
    }
  }
}
