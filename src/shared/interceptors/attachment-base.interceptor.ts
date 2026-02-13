import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { ATTACHMENT_BASE_DECORATOR } from "../decorator/attachment-base.decorator";
import { ConfigService } from "@nestjs/config";
import { STORAGE_PATH } from "../constants";

export class AttachmentBaseInterceptor implements NestInterceptor {
    constructor(
        private readonly configService: ConfigService
    ) { }
    intercept(_: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data) => this.attachBaseUrl(data))
        );
    }

    private attachBaseUrl(data: any) {
        const protoType = Object.getPrototypeOf(data);
        const metaData = Reflect.getMetadata(ATTACHMENT_BASE_DECORATOR, protoType) || null;

        if (!metaData) {
            return data;
        }

        if (Array.isArray(data)) {
            return data.map((item) => this.attachBaseUrl(item));
        }

        for (const key in data) {
            const value = data[key];
            if (typeof value === 'object') {
                data[key] = this.attachBaseUrl(value);
                continue;
            }

            data[key] = 'http://localhost:' + this.configService.get('APP_PORT') + '/' + STORAGE_PATH + '/' + value;
        }
    }

}