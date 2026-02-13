import { Inject, Injectable } from '@nestjs/common';
import { ATTACHMENT_REPOSITORY_INTERFACE } from '../repository/attachment.repository';
import type { AttachmentRepositoryInterface } from '../repository/attachment.repository.interface';
import type { AttachmentServiceInterface } from './attachment.service.interface';

@Injectable()
export class AttachmentService implements AttachmentServiceInterface {
  constructor(
    @Inject(ATTACHMENT_REPOSITORY_INTERFACE)
    private readonly attachmentRepository: AttachmentRepositoryInterface,
  ) { }

  async insertAttachmentUrl(contentId: string, url: string): Promise<void> {
    await this.attachmentRepository.create({
      filename: url.split('/').pop()!,
      contentId,
      url,
    });
  }
}
