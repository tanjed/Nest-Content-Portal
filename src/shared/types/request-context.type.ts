import { User } from "@/modules/admin/user/entities/user.entity";


export interface RequestContext {
    requestId: string;
    timeZone: string;
    ip?: string;
    userAgent?: string;
    user?: User;
    permissions?: Set<string>;
}