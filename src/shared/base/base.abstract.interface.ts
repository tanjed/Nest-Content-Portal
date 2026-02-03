import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { BaseRepositoryInterface } from "./base.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";

export abstract class BaseRepository<T extends object> implements BaseRepositoryInterface<T> {
    constructor(
        protected readonly repository: Repository<T>
    ){}

    find(id: string): Promise<T | null> {
        const options: FindOptionsWhere<T> = { id } as any;
        return this.repository.findOneBy(options);
    }
    findAll(): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    create(data: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(data)
        return this.repository.save(entity)
    }
    update(id: string, params: DeepPartial<T>): Promise<T | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}
