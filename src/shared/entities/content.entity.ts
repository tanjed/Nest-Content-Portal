import { Category } from '../../modules/admin/category/entity/category.entity';

import { User } from '../../modules/admin/user/entities/user.entity';
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Attachment } from '../../modules/admin/attachments/entity/attachment.entity';
import { MaintainTimeZone } from '../decorator/timezone.decorator';

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

  @MaintainTimeZone()
  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt: Date;

  @MaintainTimeZone()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @MaintainTimeZone()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @MaintainTimeZone()
  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.contents)
  author: User;

  @ManyToOne(() => Category, (category) => category.contents)
  category: Category;

  @ManyToOne(() => Category, (category) => category.subCategoryContents)
  subCategory: Category;

  @OneToMany(() => Attachment, (attachment) => attachment.content)
  attachments: Attachment[]

  @AfterLoad()
  setAttachment() {
    if (this.attachments) {
      this.attachments = this.attachments.map((attachment) => {
        return {
          ...attachment,
          url: `${process.env.APP_URL}/${attachment.url}`,
        };
      });
    }
  }
}
