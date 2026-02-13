
import 'reflect-metadata';

export const DATETIME_FIELD_DECORATOR = Symbol('TIMEZONE_FIELD_DECORATOR')
export const MaintainTimeZone = () => {
    return (target: any, propertyKey: string) => {
        const metadata = Reflect.getMetadata(DATETIME_FIELD_DECORATOR, target) || {};
        metadata[propertyKey] = true;
        // console.log('TT', metadata, target, propertyKey);
        Reflect.defineMetadata(DATETIME_FIELD_DECORATOR, metadata, target);
    }
}