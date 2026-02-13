import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentRepository } from "../repository/content.repository";
import { CONTENT_REPOSITORY_INTERFACE } from "../repository/content.repository.interface";
import { ContentService } from "./content.service";
import { CONTENT_SERVICE_INTERFACE } from "./content.service.interface";
import { Category } from "../../../../modules/admin/category/entity/category.entity";
import { Content } from "../../../../shared/entities/content.entity";

@Module({
    imports: [
            TypeOrmModule.forFeature([Content, Category]),
        ],
        providers: [
            ContentRepository,
            {
                provide: CONTENT_SERVICE_INTERFACE,
                useClass: ContentService
            },
            {
                provide: CONTENT_REPOSITORY_INTERFACE,
                useExisting: ContentRepository
            }
        ],
        exports: [CONTENT_SERVICE_INTERFACE]
})
export class ContentServiceModule { }