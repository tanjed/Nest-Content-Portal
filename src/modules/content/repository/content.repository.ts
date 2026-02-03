import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Content } from "../entities/content.entity";
import { ContentRepositoryInterface } from "../interface/content.repository.interface";

@Injectable()
export class ContentRepository implements ContentRepositoryInterface {
    constructor(
        @InjectRepository(Content)
        private readonly repo: Repository<Content>,
    ){}

    find(id: string): Promise<Content | null> {
      return this.repo.findOne({
            where : {
                id: id
            }
        })
    }
    findAll(): Promise<Content[]> {
        throw new Error("Method not implemented.");
    }
    async create(c: Partial<Content>): Promise<Content> {
        const content = this.repo.create(c);
        return this.repo.save(content);
    }
    update(id: string, params: Partial<Content>): Promise<Content | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}
