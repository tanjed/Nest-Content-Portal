import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AssignRoleDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsArray()
    @IsString({ each: true })
    @IsUUID('4', { each: true })
    roleIds: string[];
}
