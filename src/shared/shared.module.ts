import { Global, Module } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { TransactionService } from './db/transaction.service';
import { RequestContextMiddleware } from './middlewares/request-context.middleware';
import { ContextService } from './services/context.service';
import { CONTEXT_SERVICE_INTERFACE } from './services/context.service.interface';
import { RequestContext } from './types/request-context.type';
import { MulterModule } from '@nestjs/platform-express';
import { TEMP_PATH } from './constants';

@Global()
@Module({
  imports: [
    MulterModule.register({
      dest: TEMP_PATH,
    }),
  ],
  providers: [TransactionService,
    {
      provide: AsyncLocalStorage,
      useValue: new AsyncLocalStorage<RequestContext>(),
    },
    {
      provide: CONTEXT_SERVICE_INTERFACE,
      useClass: ContextService
    },
    RequestContextMiddleware,
  ],
  exports: [TransactionService, CONTEXT_SERVICE_INTERFACE, MulterModule],
})
export class SharedModule { }
