import { Inject, Injectable, Module } from "@nestjs/common";
import { ContentServiceInterface } from "./content.service.interface";
import { Content } from "@/shared/entities/content.entity";
import { ContentRepositoryInterface } from "../repository/content.respository.interface";
import { PUBLIC_CONTENT_REPOSITORY_INTERFACE } from "../repository/content.repository";
import { PopularContentsDto } from "../dto/popular-content.dto";
import dayjs from "dayjs";
import { LatestContentDto } from "../dto/latest-content.dto";

@Injectable()
export class ContentService implements ContentServiceInterface {
    constructor(
        @Inject(PUBLIC_CONTENT_REPOSITORY_INTERFACE)
        private readonly contentRepository: ContentRepositoryInterface,
    ) { }

    async findContent(id: string): Promise<Content | null> {
        const content = await this.contentRepository.findContent(id);
        if (content) {
            await this.contentRepository.updateViews(id);
        }
        return content;
    }
    findPopularContents(data: PopularContentsDto): Promise<Content[]> {
        const { limit, fromDate } = data;
        const fromDateObj = dayjs(fromDate).toDate();

        return this.contentRepository.findPopularContents(limit, fromDateObj);
    }
    findNewestContents(data: LatestContentDto): Promise<Content[]> {
        const { limit } = data;
        return this.contentRepository.findNewestContents(limit);
    }
    findContentsByCategory(data: LatestContentDto): Promise<Content[]> {
        const { limit, categorySlug } = data;
        if (!categorySlug) {
            throw new Error("Category slug is required");
        }
        return this.contentRepository.findContentsByCategory(categorySlug, limit);
    }
    findPopularContentsByCategory(data: PopularContentsDto): Promise<Content[]> {
        const { limit, categorySlug } = data;
        if (!categorySlug) {
            throw new Error("Category slug is required");
        }
        return this.contentRepository.findPopularContentsByCategory(categorySlug, limit);
    }
}