
export const ATTACHMENT_BASE_DECORATOR = 'ATTACHMENT_BASE_DECORATOR';

export const AttachBase = () => {
    return function (target: any, propertyKey: string) {
        const metaData = Reflect.getMetadata(ATTACHMENT_BASE_DECORATOR, target) || {};
        metaData[propertyKey] = true;
        Reflect.defineMetadata(ATTACHMENT_BASE_DECORATOR, metaData, target);
    }
}