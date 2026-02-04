import { PaginatedResult } from "src/shared/dto/pagination-options.dto"
import { AdminContentListRequestDto } from "../dto/admin-content-list-request.dto"
import { CreateContentDto } from "../dto/create-content.dto"
import { Content } from "../entities/content.entity"
import { UpdateContentDto } from "../dto/update-content.dto"

export const CONTENT_SERVICE_INTERFACE = Symbol('CONTENT_SERVICE_INTERFACE')

export interface ContentServiceInterface {
    find(id: string): Promise<Content | null>
    findAllPaginated(request: AdminContentListRequestDto): Promise<PaginatedResult<Content>>
    create(createContentDto: CreateContentDto): Promise<Content>
    update(id: string, updateContentDto: UpdateContentDto): Promise<Content>
    delete(id: string): Promise<boolean>
}