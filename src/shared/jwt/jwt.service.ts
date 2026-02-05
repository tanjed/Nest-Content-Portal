import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import type { JwtServiceInterface, JwtPayload } from './jwt.service.interface';

@Injectable()
export class JwtService implements JwtServiceInterface {
    private jwtService: NestJwtService;

    constructor(@Inject(ConfigService) private readonly config: ConfigService) {
        this.jwtService = new NestJwtService({
            secret: this.config.get<string>('JWT_SECRET') || 'default-secret-key',
            signOptions: {
                expiresIn: this.config.get<string>('JWT_EXPIRES_IN') || '1d',
            },
        });
    }

    async generateToken(user: JwtPayload): Promise<string> {
        return this.jwtService.sign({
            sub: user.sub,
            email: user.email,
            roles: user.roles || [],
            permissions: user.permissions || [],
        });
    }

    async verifyToken(token: string): Promise<JwtPayload> {
        return this.jwtService.verify(token);
    }
}
