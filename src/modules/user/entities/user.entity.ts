import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Content } from "src/modules/content/entities/content.entity";
import { Role } from "src/modules/role-permission/entity/role.entity";
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

    @Column({name:'status', type:'tinyint', default: UserStatus.ACTIVE})
    status: UserStatus;

    @Column({name:'profile_img', type:"text", nullable: true})
    profileImage: string;

    @CreateDateColumn({name:'created_at', type:'datetime'})
    createdAt:Date;

    @UpdateDateColumn({name:'updated_at', type:'datetime'})
    updatedAt:Date;

    @OneToMany(() => Content, (content) => content.author)
    contents:Content[];

    @JoinTable()
    @ManyToMany(() => Role, (role) => role.users)
    roles: Role[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}