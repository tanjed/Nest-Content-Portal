import { IsEmail } from "class-validator";
import { IsPassword } from "@/shared/validation/is-valid-password.decorator";

export class AdminLoginDto {
    @IsEmail()
    email: string;

    @IsPassword()
    password: string;
}