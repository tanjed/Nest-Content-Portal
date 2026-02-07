import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QUEUE_AVAILABLE } from '../../../infrastructure/queue/queue.list';
import { Attachment } from '../entity/attachment.entity';
import { ATTACHMENT_REPOSITORY_INTERFACE, AttachmentRepository } from '../repository/attachment.repository';
import { AttachmentService } from './attachment.service';
import { ATTACHMENT_SERVICE_INTERFACE } from './attachment.service.interface';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_AVAILABLE.CONTENT_ATTACHMENT_UPLOAD, 
    }),
    TypeOrmModule.forFeature([Attachment])
  ],
  providers: [
    AttachmentRepository,
    {
      provide: ATTACHMENT_SERVICE_INTERFACE,
      useClass: AttachmentService,
    },
    {
      provide: ATTACHMENT_REPOSITORY_INTERFACE,
      useExisting: AttachmentRepository,
    },
  ],
  exports: [ATTACHMENT_SERVICE_INTERFACE],
})
export class AttachmentServiceModule {}
