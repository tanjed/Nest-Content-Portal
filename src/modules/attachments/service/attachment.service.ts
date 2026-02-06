import { Inject, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Attachment } from '../entity/attachment.entity';
import { ATTACHMENT_REPOSITORY_INTERFACE } from '../repository/attachment.repository';
import type { AttachmentServiceInterface } from './attachment.service.interface';
import type { AttachmentRepositoryInterface } from '../repository/attachment.repository.interface';
import { Queue } from 'bullmq';
import { QUEUE_AVAILABLE, ATTACHMENT_JOBS } from 'src/shared/queue/queue.list';

@Injectable()
export class AttachmentService implements AttachmentServiceInterface {
  constructor(
    @Inject(ATTACHMENT_REPOSITORY_INTERFACE)
    private readonly attachmentRepository: AttachmentRepositoryInterface,
    @InjectQueue(QUEUE_AVAILABLE.CONTENT_ATTACHMENT_UPLOAD)
    private readonly attachmentUploadQueue: Queue,
  ) {}

  async enqueueAttachmentForUpload(contentId: string, files: Express.Multer.File[]): Promise<void> {
    files.forEach(file => {
      this.attachmentUploadQueue.add(ATTACHMENT_JOBS.UPLOAD, {
        source: file.path,
        filename: file.filename,
        contentId: contentId,
      });
    });
  }

  async uploadAttachments(contentId: string, files: Express.Multer.File[]): Promise<void> {
    // TODO: Implement actual upload logic (S3, etc.)
  }
}
