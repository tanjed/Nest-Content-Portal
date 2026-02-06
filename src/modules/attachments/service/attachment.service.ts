import { Inject, Injectable } from '@nestjs/common';
import { Attachment } from '../entity/attachment.entity';
import { ATTACHMENT_REPOSITORY_INTERFACE } from '../repository/attachment.repository';
import type { AttachmentServiceInterface } from './attachment.service.interface';
import type { AttachmentRepositoryInterface } from '../repository/attachment.repository.interface';
import { Queue } from 'bullmq';
import { QUEUE_AVAILABLE } from 'src/shared/queue/queue.list';

@Injectable()
export class AttachmentService implements AttachmentServiceInterface {
  constructor(
    @Inject(ATTACHMENT_REPOSITORY_INTERFACE)
    private readonly attachmentRepository: AttachmentRepositoryInterface,
    private readonly queue: Queue,
  ) {}

  async enqueueAttachmentForUpload(contentId: string, files: Express.Multer.File[]): Promise<void> {
     files.forEach(file => {
      this.queue.add(QUEUE_AVAILABLE.CONTENT_ATTACHMENT_UPLOAD, {
        source: file.path,
        filename: file.filename,
        contentId: contentId, 
      })
    })
  }

  async uploadAttachments(contentId: string, files: Express.Multer.File[]): Promise<void> {
   
  }
}
