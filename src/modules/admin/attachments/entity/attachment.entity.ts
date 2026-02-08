import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Content } from "../../../../shared/entities/content.entity";

@Entity('attachments')
export class Attachment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    filename: string;

    @Column({ type: 'varchar', length: 500 })
    url: string;

    @Column({ name: 'content_id', type: 'uuid' })
    contentId: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => Content, (content) => content.attachments)
    content: Content;
};