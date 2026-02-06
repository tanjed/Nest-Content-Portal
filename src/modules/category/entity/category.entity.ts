import { Content } from "../../content/entities/content.entity";
import { SubCategory } from "../../sub-category/entity/sub-category.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'name', type: 'varchar', length: 100, unique: true})
    name: string;

    @Column({name: 'slug', type: 'varchar', length: 100, unique: true})
    slug: string;

    @Column({name: 'description', type: 'text', nullable: true})
    description?: string;

    @Column({name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @OneToMany(() => SubCategory, subCategory => subCategory.category)
    subCategories: SubCategory[];

    @OneToMany(() => Content, content => content.category)
    contents: Content[];
}