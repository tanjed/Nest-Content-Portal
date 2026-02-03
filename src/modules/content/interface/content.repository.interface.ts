import { Content } from "../entities/content.entity";

export const CONTENT_REPOSITORY_INTERFACE = Symbol('CONTENT_REPOSITORY_INTERFACE');

export interface ContentRepositoryInterface {
    find(id: string): Promise<Content | null>;
    findAll(): Promise<Content[]>;
    create(c: Partial<Content>): Promise<Content>;
    update(id : string, params : Partial<Content>): Promise<Content | null>;
    delete(id: string): Promise<boolean>;
}
