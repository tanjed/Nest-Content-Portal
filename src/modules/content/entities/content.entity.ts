import { Category } from '../../category/entity/category.entity';
import { SubCategory } from '../../sub-category/entity/sub-category.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Attachment } from '../../attachments/entity/attachment.entity';

export enum ContentStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Entity('contents')
@Index(['authorId', 'status'])
@Index(['categoryId'])
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  thumbnail: string;

  @Column({
    type: 'enum',
    enum: ContentStatus,
    default: ContentStatus.DRAFT,
  })
  status: ContentStatus;

  @Column({ name: 'author_id', type: 'uuid' })
  authorId: string;

  @Column({ name: 'category_id', type: 'uuid' })
  categoryId: string;

  @Column({ name: 'sub_category_id', type: 'uuid', nullable: true })
  subCategoryId?: string;

  @Column({ name: 'slug', type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ name: 'views', type: 'int', default: 0 })
  views: number;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.contents)
  author: User;

  @ManyToOne(() => Category, (category) => category.contents)
  category: Category;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.contents)
  subCategory: SubCategory;

  @OneToMany(() => Attachment, (attachment) => attachment.content)
  attachments: Attachment[];
}
