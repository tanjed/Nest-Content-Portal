import { MaintainTimeZone } from "@/shared/decorator/timezone.decorator";
import { Content } from "../../../../shared/entities/content.entity";

import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', type: 'varchar', length: 100, unique: true })
    name: string;

    @Column({ name: 'slug', type: 'varchar', length: 100, unique: true })
    slug: string;

    @Column({ name: 'description', type: 'text', nullable: true })
    description?: string;

    @Column({ name: 'parent_id', type: 'uuid', nullable: true })
    parentId?: string;

    @MaintainTimeZone()
    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @MaintainTimeZone()
    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @MaintainTimeZone()
    @DeleteDateColumn({ name: 'deleted_at', select: false })
    deletedAt: Date;

    @OneToMany(() => Category, subCategory => subCategory.parentCategory)
    @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
    subCategories: Category[];

    @ManyToOne(() => Category, category => category.subCategories)
    @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
    parentCategory: Category;

    @OneToMany(() => Content, content => content.category)
    contents: Content[];

    @OneToMany(() => Content, content => content.subCategory)
    subCategoryContents: Content[];
}