import { Module } from '@nestjs/common';
import { AttachmentServiceModule } from '../../modules/admin/attachments/service/attachment.service.module';
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
