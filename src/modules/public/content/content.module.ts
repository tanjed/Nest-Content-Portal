import { Module } from "@nestjs/common";
import { ContentController } from "./controller/content.controller";
import { ContentService } from "./service/content.service";
import { ContentRepository, PUBLIC_CONTENT_REPOSITORY_INTERFACE } from "./repository/content.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "@/shared/entities/content.entity";
import { PUBLIC_CONTENT_SERVICE_INTERFACE } from "./service/content.service.interface";

@Module({
    imports: [TypeOrmModule.forFeature([Content])],
    controllers: [ContentController],
    providers: [
        {
            provide: PUBLIC_CONTENT_SERVICE_INTERFACE,
            useClass: ContentService
        },
        {
            provide: PUBLIC_CONTENT_REPOSITORY_INTERFACE,
            useClass: ContentRepository
        }
    ]
})

export class ContentModule { }