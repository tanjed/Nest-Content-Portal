import { IsEmail, IsString, MaxLength } from "class-validator";
import { IsPassword } from "@/shared/validation/is-valid-password.decorator";

export class CreateUserDto {
    @IsString()
    @MaxLength(100)
    name: string;

    @IsEmail()
    email: string;

    @IsPassword()
    @IsString()
    password: string;

    @IsString()
    roles: string[];
}