import { Category } from "src/modules/category/entity/category.entity";
import { Content } from "src/modules/content/entities/content.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('sub_categories')
export class SubCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'name', type: 'varchar', length: 100})
    name: string;

    @Column({name: 'slug', type: 'varchar', length: 100, unique: true})
    slug: string;

    @Column({name: 'category_slug', type: 'varchar', length: 100})
    categorySlug: string;

    @Column({name: 'description', type: 'text', nullable: true})
    description?: string;

    @Column({name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @ManyToOne(() => Category, category => category.subCategories, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'category_slug',
        referencedColumnName: 'slug',
    })
    category: Category;

    @OneToMany(() => Content, content => content.subCategory)
    contents: Content[];
}