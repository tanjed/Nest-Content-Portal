import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/db/database.module';
import { AttachmentServiceModule } from './modules/attachments/service/attachment.service.module';
import { QueueModule } from './infrastructure/queue/queue.module';

@Module({
  imports: [
    DatabaseModule,
    QueueModule,
    AttachmentServiceModule,
  ],
})
export class WorkerModule {}
