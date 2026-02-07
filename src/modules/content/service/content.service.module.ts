import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttachmentServiceModule } from "../../../modules/attachments/service/attachment.service.module";
import { Content } from "../entities/content.entity";
import { ContentRepository } from "../repository/content.repository";
import { CONTENT_REPOSITORY_INTERFACE } from "../repository/content.repository.interface";
import { ContentService } from "./content.service";
import { CONTENT_SERVICE_INTERFACE } from "./content.service.interface";
import { Category } from "../../../modules/category/entity/category.entity";
import { SubCategory } from "../../../modules/sub-category/entity/sub-category.entity";

@Module({
    imports:[
        AttachmentServiceModule,
        TypeOrmModule.forFeature([Content, Category, SubCategory]),
    ],
    providers:[
        ContentRepository,
        {
            provide: CONTENT_SERVICE_INTERFACE,
            useClass: ContentService
        },
        {
            provide: CONTENT_REPOSITORY_INTERFACE,
            useExisting:  ContentRepository
        }
    ],
    exports:[CONTENT_SERVICE_INTERFACE]
})
export class ContentServiceModule{}