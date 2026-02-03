import { CreateContentDto } from "../dto/create-content.dto"
import { Content } from "../entities/content.entity"

export const CONTENT_SERVICE_INTERFACE = Symbol('CONTENT_SERVICE_INTERFACE')

export interface ContentServiceInterface {
    create(createContentDto: CreateContentDto): Promise<Content>
}