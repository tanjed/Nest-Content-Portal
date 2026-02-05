import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JWT_SERVICE_INTERFACE } from './jwt.service.interface';
import { JwtService } from './jwt.service';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: JWT_SERVICE_INTERFACE,
            useClass: JwtService,
        },
    ],
    exports: [JWT_SERVICE_INTERFACE],
})
export class JwtModule {}
