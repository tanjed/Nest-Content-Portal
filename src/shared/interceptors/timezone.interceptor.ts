import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { RequestContext } from "../types/request-context.type";
import dayjs from "dayjs";
import { AsyncLocalStorage } from "async_hooks";
import { Reflector } from "@nestjs/core";
import { DATETIME_FIELD_DECORATOR } from "../decorator/timezone.decorator";
import { REQUEST_CONTEXT_STORE } from "../constants";
import { CONTEXT_SERVICE_INTERFACE, ContextServiceInterface } from "../services/context.service.interface";

@Injectable()
export class TimeZoneInterceptor implements NestInterceptor {
    constructor(
        @Inject(CONTEXT_SERVICE_INTERFACE)
        private readonly contextService: ContextServiceInterface,
        private readonly reflector: Reflector,
    ) { }

    intercept(_: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const timeZone = this.contextService.getItem('timeZone') || 'UTC';

        return next.handle().pipe(
            map((data) => {
                return this.convertDateToTimeZone(data, timeZone);
            })
        );
    }

    private convertDateToTimeZone(data: any, timezone: string): any {
        if (!data || typeof data !== 'object') {
            return data;
        }

        if (data instanceof Date) {
            return dayjs(data).tz(timezone).format();
        }

        if (Array.isArray(data)) {
            return data.map((item) => this.convertDateToTimeZone(item, timezone));
        }

        const prototype = Object.getPrototypeOf(data);
        const metadata = prototype ? Reflect.getMetadata(DATETIME_FIELD_DECORATOR, prototype) : null;

        for (const key in data) {
            const value = data[key];
            if (typeof value === 'object') {
                data[key] = this.convertDateToTimeZone(value, timezone);
                continue;
            }

            if (metadata && metadata[key]) {
                if (value instanceof Date) {
                    data[key] = dayjs(value).tz(timezone).format();
                } else if (typeof value === 'string' && dayjs(value).isValid()) {
                    data[key] = dayjs(value).tz(timezone).format();
                }
            }
        }
        return data;
    }
}