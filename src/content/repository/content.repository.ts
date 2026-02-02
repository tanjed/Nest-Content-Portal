import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content.entity";
import { ContentRepositoryInterface } from "../interface/content.repository.interface";

@Injectable()
export class ContentRepository implements ContentRepositoryInterface {
    find(): Promise<Content | null> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Content[]> {
        throw new Error("Method not implemented.");
    }
    create(c: Content): string {
        throw new Error("Method not implemented.");
    }
    update(id: string, params: Partial<Content>): Promise<Content | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}
