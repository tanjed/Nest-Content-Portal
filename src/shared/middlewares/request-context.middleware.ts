import { Injectable, NestMiddleware } from "@nestjs/common";
import { randomUUID } from "crypto";
import { requestContext, RequestContext } from "../types/request-context.type";
import { Request } from "express";

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: (error?: any) => void) {

        requestContext.run({
            requestId: randomUUID(),
            timeZone: req.headers['x-timezone'] as string || 'UTC',
            ip: req.ip,
            userAgent: req.headers['user-agent'] || '',
        }, () => next());
    }
}