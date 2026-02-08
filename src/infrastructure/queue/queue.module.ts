import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from "@nestjs/common";
import { QUEUE_AVAILABLE } from './queue.list';
import { AttachmentUploadProcessor } from './processors/attachment-upload.processor';
import { AttachmentServiceModule } from '../../modules/admin/attachments/service/attachment.service.module';

@Global()
@Module({
    imports: [
        AttachmentServiceModule,
        BullModule.forRoot({
            connection: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT) || 6379,
            },
        }),
        BullModule.registerQueue(...Object.values(QUEUE_AVAILABLE).map(queueName => ({ name: queueName }))),
    ],
    providers: [AttachmentUploadProcessor],
})
export class QueueModule {}