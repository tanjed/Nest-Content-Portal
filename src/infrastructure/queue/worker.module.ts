import { Module } from '@nestjs/common';
import { AttachmentServiceModule } from '../../modules/attachments/service/attachment.service.module';
import { DatabaseModule } from '../../shared/db/database.module';
import { QueueModule } from './queue.module';

@Module({
  imports: [
    DatabaseModule,
    QueueModule,
    AttachmentServiceModule,
  ],
})
export class WorkerModule {}
