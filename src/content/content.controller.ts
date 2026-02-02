import {
  Controller,
  Inject
} from '@nestjs/common';
import type { ContentServiceInterface } from './interface/content.service.interface';
import { CONTENT_SERVICE_INTERFACE } from './interface/content.service.interface';

/**
 * Content Controller - HTTP Layer
 * Following Single Responsibility Principle - handles HTTP only
 */
@Controller('content')
export class ContentController {
  constructor(
    @Inject(CONTENT_SERVICE_INTERFACE)
    private readonly contentService: ContentServiceInterface
  ){}


}
