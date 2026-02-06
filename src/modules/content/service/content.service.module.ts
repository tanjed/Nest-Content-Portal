import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "../entities/content.entity";
import { CONTENT_SERVICE_INTERFACE } from "./content.service.interface";
import { ContentService } from "./content.service";
import { CONTENT_REPOSITORY_INTERFACE } from "../repository/content.repository.interface";
import { ContentRepository } from "../repository/content.repository";

@Module({
    imports:[
        TypeOrmModule.forFeature([Content]),
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