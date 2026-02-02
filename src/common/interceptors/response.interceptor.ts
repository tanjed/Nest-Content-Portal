import { CallHandler, ExecutionContext, HttpCode, HttpStatus, NestInterceptor, Response } from "@nestjs/common"
import { map, Observable } from "rxjs"

interface Response {
    success: boolean
    message: string
}

interface SuccessResponse extends Response {
    data : any
}

interface ErrorResponse extends Response {
    errors: object|string[]
}

export class ApiResponseInterceptor<T> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
        const response = context.switchToHttp().getResponse()
        const statusCode = response.statusCode

        return next.handle().pipe(
            map((data) => {
                if(statusCode == HttpStatus.OK || statusCode == HttpStatus.ACCEPTED) {
                    
                }
            })
        )
    } 
}