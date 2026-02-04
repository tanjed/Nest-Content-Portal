import { NotFoundException } from "@nestjs/common"
import { CreateContentDto } from "../dto/create-content.dto"
import { Content } from "../entities/content.entity"

export const CONTENT_SERVICE_INTERFACE = Symbol('CONTENT_SERVICE_INTERFACE')

export interface ContentServiceInterface {
    find(id: string): Promise<Content | null>
    findAll(): Promise<Content[]>
    create(createContentDto: CreateContentDto): Promise<Content>
}