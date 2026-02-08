import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

interface ErrorResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log(exception);


    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: Record<string, string[]> | undefined;

    if (exception instanceof BadRequestException) {
      const body = exception.getResponse() as any
      errors = body.errors || null
      message = body.message || 'Invalid Data'
      status = HttpStatus.BAD_REQUEST
    } else if (exception instanceof QueryFailedError) {
      message = 'Failed to execute the query'
    } else if (exception instanceof HttpException) {
      message = exception.message;
      status = exception.getStatus();
    }

    const responseBody: ErrorResponse = {
      success: false,
      message,
      ...(errors ? { errors } : { error: message }),
    };

    response.status(status).json(responseBody);
  }
}
