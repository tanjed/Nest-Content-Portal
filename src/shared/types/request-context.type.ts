import { AsyncLocalStorage } from "async_hooks";

export interface RequestContext {
    requestId: string;
    timeZone: string;
    ip?: string;
    userAgent?: string;
}

export const requestContext = new AsyncLocalStorage<RequestContext>();