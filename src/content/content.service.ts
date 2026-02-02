import { Inject, Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { CONTENT_REPO_TOKEN } from './interface/content.repository.interface';
import type { ContentRepositoryInterface } from './interface/content.repository.interface';  

@Injectable()
export class ContentService {
  constructor(
    @Inject(CONTENT_REPO_TOKEN)
    private readonly contentRepository : ContentRepositoryInterface,
  ){}
  
  create(createContentDto: CreateContentDto) {
    return 'This action adds a new content';
  }

  findAll() {
    return `This action returns all content`;
  }

  findOne(id: number) {
    return `This action returns a #${id} content`;
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return `This action updates a #${id} content`;
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}
