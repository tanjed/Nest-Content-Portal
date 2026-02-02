import { Content } from "../entities/content.entity";

export const CONTENT_REPO_TOKEN = Symbol('CONTENT_REPOSITORY_INTERFACE');

export interface ContentRepositoryInterface {
    find(): Promise<Content | null>;
    findAll(): Promise<Content[]>;
    create(c : Content): string;
    update(id : string, params : Partial<Content>): Promise<Content | null>;
    delete(id: string): Promise<boolean>;
}
