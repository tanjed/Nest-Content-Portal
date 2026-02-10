import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { randomUUID } from "crypto";
import { RequestContext } from "../types/request-context.type";
import { Request } from "express";
import { AsyncLocalStorage } from "async_hooks";
import { REQUEST_CONTEXT_STORE } from "../constants";
import { CONTEXT_SERVICE_INTERFACE, ContextServiceInterface } from "../services/context.service.interface";

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
    constructor(
        @Inject(CONTEXT_SERVICE_INTERFACE)
        private readonly contextService: ContextServiceInterface,
    ) { }

    use(req: Request, res: Response, next: (error?: any) => void) {
        this.contextService.init({
            requestId: randomUUID(),
            timeZone: req.headers['x-timezone'] as string || 'UTC',
            ip: req.ip,
            userAgent: req.headers['user-agent'] || '',
        }, next);
    }
}