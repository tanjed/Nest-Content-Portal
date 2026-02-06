import { QueryRunner } from "typeorm"
import { AdminContentListRequestDto } from "../dto/admin-content-list-request.dto"
import { CreateContentDto } from "../dto/create-content.dto"
import { UpdateContentDto } from "../dto/update-content.dto"
import { Content } from "../entities/content.entity"
import { PaginatedResponseDto } from "../../../shared/dto/paginated-response.dto"

export const CONTENT_SERVICE_INTERFACE = Symbol('CONTENT_SERVICE_INTERFACE')

export interface ContentServiceInterface {
    find(id: string): Promise<Content>
    findAllPaginated(request: AdminContentListRequestDto): Promise<PaginatedResponseDto<Content>>
    create(createContentDto: CreateContentDto, files?: Express.Multer.File[], queryRunner?: QueryRunner): Promise<Content>
    update(id: string, updateContentDto: UpdateContentDto, files?: Express.Multer.File[], queryRunner?: QueryRunner): Promise<Content>
    delete(id: string): Promise<void>
}