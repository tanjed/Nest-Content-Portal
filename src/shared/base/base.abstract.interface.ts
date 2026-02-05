import { DeepPartial, FindOptionsWhere, FindOptionsRelations, QueryRunner, Repository } from "typeorm";
import { BaseRepositoryInterface } from "./base.repository.interface";

export abstract class BaseRepository<T extends object> implements BaseRepositoryInterface<T> {
    constructor(
        protected readonly repository: Repository<T>
    ){}

    find(id: string, relations?: FindOptionsRelations<T>, queryRunner?: QueryRunner): Promise<T | null> {
        const options: FindOptionsWhere<T> = { id } as any;
        const repo = this.getRepository(this.repository, queryRunner);
        return repo.findOne({
            where: options,
            relations,
        });
    }

    findAll(queryRunner?: QueryRunner): Promise<T[]> {
        const repo = this.getRepository(this.repository, queryRunner);
        return repo.find();
    }

    create(data: DeepPartial<T>, queryRunner?: QueryRunner): Promise<T> {
        const repo = this.getRepository(this.repository, queryRunner);
        const entity = repo.create(data);
        return repo.save(entity);
    }

    async update(id: string, params: DeepPartial<T>, queryRunner?: QueryRunner): Promise<T | null> {
        const repo = this.getRepository(this.repository, queryRunner);
        const options: FindOptionsWhere<T> = { id } as any;
        const entity = await repo.findOneBy(options);

        if (!entity) {
            return null;
        }

        Object.assign(entity, params);
        return repo.save(entity);
    }

    async delete(id: string, queryRunner?: QueryRunner): Promise<boolean> {
        const repo = this.getRepository(this.repository, queryRunner);
        const options: FindOptionsWhere<T> = { id } as any;
        const result = await repo.delete(options);
        return (result?.affected ?? 0) > 0;
    }

    protected getRepository = <T extends object>(repository: Repository<T>, queryRunner?: QueryRunner): Repository<T> => {
        return queryRunner ? queryRunner.manager.getRepository(repository.target) : repository;
    };
}
