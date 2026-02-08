import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import * as fs from 'fs';
import { STORAGE_PATH } from '@/shared/constants';
import { AttachmentUploadJobData } from '@/infrastructure/queue/processors/attachment-upload.processor';
import { ATTACHMENT_JOBS, QUEUE_AVAILABLE } from '@/infrastructure/queue/queue.list';
import { ATTACHMENT_REPOSITORY_INTERFACE } from '../repository/attachment.repository';
import type { AttachmentRepositoryInterface } from '../repository/attachment.repository.interface';
import type { AttachmentServiceInterface } from './attachment.service.interface';

@Injectable()
export class AttachmentService implements AttachmentServiceInterface {
  constructor(
    @Inject(ATTACHMENT_REPOSITORY_INTERFACE)
    private readonly attachmentRepository: AttachmentRepositoryInterface,
    @InjectQueue(QUEUE_AVAILABLE.CONTENT_ATTACHMENT_UPLOAD)
    private readonly attachmentUploadQueue: Queue,
  ) { }

  async enqueueAttachmentForUpload(contentId: string, files: Express.Multer.File[]): Promise<void> {
    files.forEach(file => {
      this.attachmentUploadQueue.add(ATTACHMENT_JOBS.UPLOAD, {
        source: file.path,
        filename: file.filename,
        contentId: contentId,
      });
    });
  }

  async uploadAttachments(data: AttachmentUploadJobData): Promise<void> {

    fs.mkdirSync(STORAGE_PATH, { recursive: true });

    const dest = `${STORAGE_PATH}/${data.filename}`;

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(data.source)
        .pipe(fs.createWriteStream(dest))
        .on('finish', resolve)
        .on('error', reject);
    });

    this.attachmentRepository.update(data.contentId, { filename: dest });
    fs.unlinkSync(data.source);
  }
}
