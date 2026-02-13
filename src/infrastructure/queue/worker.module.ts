import { Module } from '@nestjs/common';
import { AttachmentServiceModule } from '../../modules/admin/attachments/service/attachment.service.module';
import { DatabaseModule } from '../../shared/db/database.module';
import { QueueModule } from './queue.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AttachmentUploadProcessor } from './processors/attachment-upload.processor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    DatabaseModule,
    QueueModule,
    AttachmentServiceModule,
  ],
  providers: [
    AttachmentUploadProcessor,
  ],
})
export class WorkerModule { }
