import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";
import { IsPassword } from "@/shared/validation/is-valid-password.decorator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsPassword()
    @IsString()
    password?: string;

    @IsOptional()
    status?: number;

    @IsOptional()
    @IsString()
    profileImage?: string;

    @IsOptional()
    @IsString()
    roles?: string[];
}
