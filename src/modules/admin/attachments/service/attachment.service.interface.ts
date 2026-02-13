import { AttachmentUploadJobData } from '@/infrastructure/queue/processors/attachment-upload.processor';

export const ATTACHMENT_SERVICE_INTERFACE = Symbol('ATTACHMENT_SERVICE_INTERFACE');

export interface AttachmentServiceInterface {
  insertAttachmentUrl(contentId: string, url: string): Promise<void>;
}
