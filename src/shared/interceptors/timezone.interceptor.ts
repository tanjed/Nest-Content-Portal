import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { requestContext } from "../types/request-context.type";
import dayjs from "dayjs";

@Injectable()
export class TimeZoneInterceptor implements NestInterceptor {
    intercept(_: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const ctx = requestContext.getStore();
        const timeZone = ctx?.timeZone || 'UTC';

        return next.handle().pipe(
            map((data) => {
                return this.convertDateToTimeZone(data, timeZone);
            })
        );
    }

    private convertDateToTimeZone(data: any, timezone: string): any {
        if (data instanceof Date) {
            return dayjs(data).tz(timezone).toDate();
        }
        if (Array.isArray(data)) {
            return data.map((item) => this.convertDateToTimeZone(item, timezone));
        }
        if (typeof data === 'object' && data !== null) {
            const result: any = {};
            for (const key in data) {
                result[key] = this.convertDateToTimeZone(data[key], timezone);
            }
            return result;
        }
        return data;
    }
}