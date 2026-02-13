
import { IsPassword } from "@/shared/validation/is-valid-password.decorator";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class UpdatePasswordDto {
    @IsString()
    @Expose({name: 'user_id'})
    userId: string;

    @IsString()
    @Expose({name: 'new_password'})
    @IsPassword()
    newPassword: string;
}