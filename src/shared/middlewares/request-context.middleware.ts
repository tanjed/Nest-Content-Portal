import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { randomUUID } from "crypto";
import { RequestContext } from "../types/request-context.type";
import { Request } from "express";
import { AsyncLocalStorage } from "async_hooks";
import { REQUEST_CONTEXT_STORE } from "../constants";

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
    constructor(
        @Inject(REQUEST_CONTEXT_STORE)
        private readonly requestContext: AsyncLocalStorage<RequestContext>,
    ) { }

    use(req: Request, res: Response, next: (error?: any) => void) {
        this.requestContext.run({
            requestId: randomUUID(),
            timeZone: req.headers['x-timezone'] as string || 'UTC',
            ip: req.ip,
            userAgent: req.headers['user-agent'] || '',
        }, () => next());
    }
}