import { InjectQueue } from "@nestjs/bullmq";
import { Inject, Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import * as fs from 'fs';
import { STORAGE_PATH } from "../../../shared/constants";
import { ATTACHMENT_SERVICE_INTERFACE, AttachmentServiceInterface } from "../../../modules/admin/attachments/service/attachment.service.interface";
import { AttachmentUploadJobData } from "../processors/attachment-upload.processor";
import { ATTACHMENT_JOBS, QUEUE_AVAILABLE } from "../queue.list";
import { QueueServiceInterface } from "./queue.service.interface";

@Injectable()
export class QueueService implements QueueServiceInterface {
    constructor(
        @InjectQueue(QUEUE_AVAILABLE.CONTENT_ATTACHMENT_UPLOAD)
        private readonly attachmentUploadQueue: Queue,
        @Inject(ATTACHMENT_SERVICE_INTERFACE)
        private readonly attachmentService: AttachmentServiceInterface,
    ) { }

    async uploadAttachment(data: AttachmentUploadJobData): Promise<void> {
        fs.mkdirSync(STORAGE_PATH, { recursive: true });

        const dest = `${STORAGE_PATH}/${data.filename}`;

        await new Promise<void>((resolve, reject) => {
            fs.createReadStream(data.source)
                .pipe(fs.createWriteStream(dest))
                .on('finish', resolve)
                .on('error', reject);
        });

        await this.attachmentService.insertAttachmentUrl(data.contentId, dest);
        fs.unlinkSync(data.source);
    }

    async enqueueAttachmentForUpload(contentId: string, files: Express.Multer.File[]): Promise<void> {
        files.forEach(file => {
            this.attachmentUploadQueue.add(ATTACHMENT_JOBS.UPLOAD, {
                source: file.path,
                filename: file.filename + '.' + file.mimetype.split('/')[1],
                contentId: contentId,
            });
        });
    }
}
