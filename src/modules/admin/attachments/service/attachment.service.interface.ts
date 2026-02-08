import { AttachmentUploadJobData } from '../../../infrastructure/queue/processors/attachment-upload.processor';

export const ATTACHMENT_SERVICE_INTERFACE = Symbol('ATTACHMENT_SERVICE_INTERFACE');

export interface AttachmentServiceInterface {
  enqueueAttachmentForUpload(contentId:string, files: Express.Multer.File[]): Promise<void>;
  uploadAttachments(data: AttachmentUploadJobData): Promise<void>;
}
