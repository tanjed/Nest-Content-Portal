import { Content, ContentStatus } from "@/shared/entities/content.entity";
import { ContentRepositoryInterface } from "./content.respository.interface";
import { Repository, MoreThan, MoreThanOrEqual } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

export const PUBLIC_CONTENT_REPOSITORY_INTERFACE = Symbol('PUBLIC_CONTENT_REPOSITORY_INTERFACE')
@Injectable()
export class ContentRepository implements ContentRepositoryInterface {
    constructor(
        @InjectRepository(Content)
        private readonly contentRepository: Repository<Content>,
    ) { }

    findContent(id: string): Promise<Content | null> {
        return this.contentRepository.findOne({
            where: { id },
            relations: { category: true, subCategory: true, attachments: true, author: true }
        });
    }
    findPopularContents(limit: number, fromDate: Date): Promise<Content[]> {
        return this.contentRepository.find({
            where: { publishedAt: MoreThanOrEqual(fromDate), status: ContentStatus.PUBLISHED },
            relations: { author: true },
            take: limit,
            order: { views: 'DESC' }
        });
    }
    findNewestContents(limit: number): Promise<Content[]> {
        return this.contentRepository.find({
            where: { status: ContentStatus.PUBLISHED },
            relations: { author: true },
            take: limit,
            order: { publishedAt: 'DESC' }
        });
    }
    findContentsByCategory(categoryId: string, limit: number): Promise<Content[]> {
        return this.contentRepository.find({
            where: { category: { id: categoryId }, status: ContentStatus.PUBLISHED },
            relations: { author: true },
            take: limit,
            order: { publishedAt: 'DESC' }
        });
    }
    findPopularContentsByCategory(categoryId: string, limit: number): Promise<Content[]> {
        return this.contentRepository.find({
            where: { category: { id: categoryId }, status: ContentStatus.PUBLISHED },
            relations: { author: true },
            take: limit,
            order: { views: 'DESC' }
        });
    }

}