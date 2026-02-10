import { Injectable, Scope } from "@nestjs/common";
import { AsyncLocalStorage } from "async_hooks";
import { RequestContext } from "../types/request-context.type";
import { ContextServiceInterface } from "./context.service.interface";

@Injectable()
export class ContextService implements ContextServiceInterface {
    constructor(
        private readonly store: AsyncLocalStorage<RequestContext>
    ) { }

    init(data: RequestContext, cb: () => void): void {
        this.store.run(data, cb);
    }

    setItem<T extends keyof RequestContext>(key: T, value: RequestContext[T]): void {
        const store = this.store.getStore();
        if (!store)
            return;

        store[key] = value;
    }

    getItem<T extends keyof RequestContext>(key: T): RequestContext[T] | undefined {
        const store = this.store.getStore();
        return store?.[key];
    }
}