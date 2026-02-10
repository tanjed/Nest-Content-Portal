import { RequestContext } from "../types/request-context.type";

export const CONTEXT_SERVICE_INTERFACE = 'CONTEXT_SERVICE_INTERFACE';
export interface ContextServiceInterface {
    init(data: RequestContext, cb: () => void): void;
    setItem<T extends keyof RequestContext>(key: T, value: RequestContext[T]): void;
    getItem<T extends keyof RequestContext>(key: T): RequestContext[T] | undefined;
}