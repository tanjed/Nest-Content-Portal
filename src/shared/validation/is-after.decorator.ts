import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsAfter(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAfter',
      target: object.constructor,
      propertyName,
      options: {
        message: `${propertyName} must be after ${property}`,
        ...validationOptions
    },
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          if (!value || !relatedValue) return true; // let other validators handle empty

          return new Date(value) > new Date(relatedValue);
        },
      },
    });
  };
}