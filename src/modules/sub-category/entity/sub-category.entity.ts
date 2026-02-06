import { Category } from "src/modules/category/entity/category.entity";
import { Content } from "src/modules/content/entities/content.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('sub_categories')
export class SubCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'name', type: 'varchar', length: 100})
    name: string;

    @Column({name: 'description', type: 'text', nullable: true})
    description?: string;

    @Column({name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @ManyToOne(() => Category, category => category.subCategories, { onDelete: 'CASCADE' })
    category: Category;

    @OneToMany(() => Content, content => content.subCategory)
    contents: Content[];
}