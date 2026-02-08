import { Content } from "@/shared/entities/content.entity"
import { UpdateResult } from "typeorm"

export interface ContentRepositoryInterface {
    findContent(id: string): Promise<Content | null>
    findPopularContents(limit: number, fromDate: Date): Promise<Content[]>
    findNewestContents(limit: number): Promise<Content[]>
    findContentsByCategory(categorySlug: string, limit: number): Promise<Content[]>
    findPopularContentsByCategory(categorySlug: string, limit: number): Promise<Content[]>
    updateViews(id: string): Promise<UpdateResult>
}