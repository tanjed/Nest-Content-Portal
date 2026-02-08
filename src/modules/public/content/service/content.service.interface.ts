import { Content } from "@/shared/entities/content.entity";
import { PopularContentsDto } from "../dto/popular-content.dto";
import { LatestContentDto } from "../dto/latest-content.dto";

export const PUBLIC_CONTENT_SERVICE_INTERFACE = Symbol('CONTENT_SERVICE_INTERFACE')
export interface ContentServiceInterface {
    findContent(id: string): Promise<Content | null>
    findPopularContents(data: PopularContentsDto): Promise<Content[]>
    findNewestContents(data: LatestContentDto): Promise<Content[]>
    findContentsByCategory(data: LatestContentDto): Promise<Content[]>
    findPopularContentsByCategory(data: PopularContentsDto): Promise<Content[]>
}