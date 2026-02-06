import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../../../shared/base/base.abstract.interface';
import { Repository } from 'typeorm';
import { Attachment } from '../entity/attachment.entity';
import { AttachmentRepositoryInterface } from './attachment.repository.interface';

export const ATTACHMENT_REPOSITORY_INTERFACE = Symbol('ATTACHMENT_REPOSITORY_INTERFACE');

export class AttachmentRepository extends BaseRepository<Attachment> implements AttachmentRepositoryInterface {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,
  ) {
    super(attachmentRepository);
  }
}
