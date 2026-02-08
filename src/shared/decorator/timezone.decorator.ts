
import 'reflect-metadata';

export const DATETIME_FIELD_DECORATOR = Symbol('TIMEZONE_FIELD_DECORATOR')
export function MaintainTimeZone() {
    return (target: any, propertyKey: string) => {
        const metadata = Reflect.getMetadata(DATETIME_FIELD_DECORATOR, target) || {};
        metadata[propertyKey] = true;
        Reflect.defineMetadata(DATETIME_FIELD_DECORATOR, metadata, target);
    }
}