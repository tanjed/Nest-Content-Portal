export const JWT_SERVICE_INTERFACE = Symbol('JWT_SERVICE_INTERFACE');

export interface JwtServiceInterface {
    generateToken(user: JwtPayload): Promise<string>;
    verifyToken(token: string): Promise<JwtPayload>;
}

export interface JwtPayload {
    sub: string;
    email: string;
    roles: string[];
    permissions: string[];
}
