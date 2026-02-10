import { Controller, Get, Inject, Param, Query, UseGuards } from "@nestjs/common";
import { ContentServiceInterface, PUBLIC_CONTENT_SERVICE_INTERFACE } from "../service/content.service.interface";
import { Content } from "@/shared/entities/content.entity";
import { PopularContentsDto } from "../dto/popular-content.dto";
import { LatestContentDto } from "../dto/latest-content.dto";
import dayjs from "dayjs";

import { ThrottlerGuard } from "@nestjs/throttler";
import { ContentResponseDto } from "../dto/content.response.dto";
import { plainToInstance } from "class-transformer";

@Controller('content')
@UseGuards(ThrottlerGuard)
export class ContentController {
    constructor(
        @Inject(PUBLIC_CONTENT_SERVICE_INTERFACE)
        private readonly contentService: ContentServiceInterface,
    ) { }

    @Get(':id')
    async findContent(@Param('id') id: string): Promise<ContentResponseDto> {
        const content = await this.contentService.findContent(id);
        return plainToInstance(ContentResponseDto, content);
    }

    @Get('popular')
    async findPopularContents(@Query() dto: PopularContentsDto): Promise<ContentResponseDto[]> {
        return this.contentService.findPopularContents(dto);
    }

    @Get('latest')
    async findNewestContents(@Query() dto: LatestContentDto): Promise<ContentResponseDto[]> {
        return this.contentService.findNewestContents(dto);
    }

    @Get('category/:categorySlug')
    async findContentsByCategory(@Param('categorySlug') categorySlug: string): Promise<ContentResponseDto[]> {
        return this.contentService.findContentsByCategory({
            categorySlug,
            limit: 10
        });
    }

    @Get('popular/category/:categorySlug')
    async findPopularContentsByCategory(@Param('categorySlug') categorySlug: string): Promise<ContentResponseDto[]> {
        return this.contentService.findPopularContentsByCategory({
            categorySlug,
            limit: 10,
            fromDate: dayjs().subtract(7, 'day').toISOString()
        });
    }
}