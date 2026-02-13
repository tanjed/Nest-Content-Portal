import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject } from '@nestjs/common';
import { Job } from 'bullmq';
import { ATTACHMENT_JOBS, QUEUE_AVAILABLE } from '../queue.list';
import { QUEUE_SERVICE_INTERFACE, QueueServiceInterface } from '../service/queue.service.interface';

export interface AttachmentUploadJobData {
  source: string;
  filename: string;
  contentId: string;
}

@Processor(QUEUE_AVAILABLE.CONTENT_ATTACHMENT_UPLOAD)
export class AttachmentUploadProcessor extends WorkerHost {
  constructor(
    @Inject(QUEUE_SERVICE_INTERFACE)
    private readonly queueService: QueueServiceInterface,
  ) {
    super();
  }

  async process(job: Job, token?: string): Promise<any> {
    switch (job.name) {
      case ATTACHMENT_JOBS.UPLOAD:
        await this.queueService.uploadAttachment(job.data);
      default:
        throw new Error(`Unknown job name: ${job.name}`);
    }
  }
}
