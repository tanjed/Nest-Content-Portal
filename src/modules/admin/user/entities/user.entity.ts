import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Content } from "../../content/entities/content.entity";
import { Role } from "../../role-permission/entity/role.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, Index, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserStatus {
    ACTIVE = 1,
    INACTIVE = 0,
}
@Entity('users')
@Index(['email'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({name:'full_name', type:'varchar', length: 50})
    full_name:string;

    @Column({name:'email', type:'varchar', length: 100, unique: true})
    email:string;

    @Exclude()
    @Column({name:'password', type:'varchar', length: 100})
    password:string;

    @Column({name:'status', type:'smallint', default: UserStatus.ACTIVE})
    status: UserStatus;

    @Column({name:'profile_img', type:"text", nullable: true})
    profileImage: string;

    @CreateDateColumn({name:'created_at', type:'timestamp'})
    createdAt:Date;

    @UpdateDateColumn({name:'updated_at', type:'timestamp'})
    updatedAt:Date;

    @OneToMany(() => Content, (content) => content.author)
    contents:Content[];

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({name: 'user_roles'})
    roles: Role[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password && !this.password.startsWith('$2b$')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}