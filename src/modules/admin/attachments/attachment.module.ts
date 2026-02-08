import { Module } from "@nestjs/common";
import { AttachmentServiceModule } from "./service/attachment.service.module";

@Module({
    imports: [AttachmentServiceModule],
})
export class AttachmentModule {}