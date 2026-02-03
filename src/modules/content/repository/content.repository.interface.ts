import { BaseRepositoryInterface } from "src/shared/base/base.repository.interface";
import { Content } from "../entities/content.entity";

export const CONTENT_REPOSITORY_INTERFACE = Symbol('CONTENT_REPOSITORY_INTERFACE');

export interface ContentRepositoryInterface extends BaseRepositoryInterface<Content> {}
