import { Attachment } from '../entity/attachment.entity';

export const ATTACHMENT_SERVICE_INTERFACE = Symbol('ATTACHMENT_SERVICE_INTERFACE');

export interface AttachmentServiceInterface {
  enqueueAttachmentForUpload(contentId:string, files: Express.Multer.File[]): Promise<void>;
  uploadAttachments(contentId: string, files: Express.Multer.File[]): Promise<void>;
}
