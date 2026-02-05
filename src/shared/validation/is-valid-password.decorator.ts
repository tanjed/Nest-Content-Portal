import { registerDecorator, ValidationOptions } from "class-validator";

export function IsPassword () {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isPassword',
            target: object.constructor,
            propertyName,
            options: {
                message: `Password must be at least 8 characters long and contain a mix of uppercase letters, lowercase letters, numbers, and symbols.`,
            },
             validator: {
                validate(value: any) {
                    if (typeof value !== 'string') return false;
                    const hasUpperCase = /[A-Z]/.test(value);
                    const hasLowerCase = /[a-z]/.test(value);
                    const hasNumber = /\d/.test(value);
                    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
                    return value.length >= 8 && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
                },
             },
        });
    }
}