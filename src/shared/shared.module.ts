import { Global, Module } from '@nestjs/common';
import { TransactionService } from './db/transaction.service';
import { ContextService } from './services/context.service';
import { CONTEXT_SERVICE_INTERFACE } from './services/context.service.interface';

@Global()
@Module({
  providers: [TransactionService, {
    provide: CONTEXT_SERVICE_INTERFACE,
    useClass: ContextService
  }],
  exports: [TransactionService, CONTEXT_SERVICE_INTERFACE],
})
export class SharedModule { }
