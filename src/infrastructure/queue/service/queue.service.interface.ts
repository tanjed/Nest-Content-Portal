import { AttachmentUploadJobData } from "../processors/attachment-upload.processor";

export const QUEUE_SERVICE_INTERFACE = 'QUEUE_SERVICE_INTERFACE';

export interface QueueServiceInterface {
    uploadAttachment(data: AttachmentUploadJobData): Promise<void>;
    enqueueAttachmentForUpload(contentId: string, files: Express.Multer.File[]): Promise<void>;
}
