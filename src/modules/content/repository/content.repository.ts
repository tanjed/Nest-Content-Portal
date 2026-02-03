import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/shared/base/base.abstract.interface";
import { Repository } from "typeorm";
import { Content } from "../entities/content.entity";
import { ContentRepositoryInterface } from "./content.repository.interface";

@Injectable()
export class ContentRepository extends BaseRepository<Content> implements ContentRepositoryInterface {
    constructor(
        @InjectRepository(Content)
        protected readonly repository: Repository<Content>,
    ){
        super(repository)
    }
}
