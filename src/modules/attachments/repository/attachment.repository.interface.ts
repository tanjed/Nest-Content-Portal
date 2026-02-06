import { BaseRepositoryInterface } from 'src/shared/base/base.repository.interface';
import { Attachment } from '../entity/attachment.entity';

export const ATTACHMENT_REPOSITORY_INTERFACE = Symbol('ATTACHMENT_REPOSITORY_INTERFACE');

export interface AttachmentRepositoryInterface extends BaseRepositoryInterface<Attachment> {}
