import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeederService } from "./seeder.service";
import { DiscoveryModule } from "@nestjs/core";

@Module({
    imports: [
        DiscoveryModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                replication : {
                master : {
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get<number>('DB_PORT', 5432),
                    username: configService.get('DB_USER', 'newsuser'),
                    password: configService.get('DB_PASSWORD', 'newspassword'),
                    database: configService.get('DB_NAME', 'newsportal'),
                },
                slaves: [
                    {
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get<number>('DB_PORT', 5432),
                    username: configService.get('DB_USER', 'newsuser'),
                    password: configService.get('DB_PASSWORD', 'newspassword'),
                    database: configService.get('DB_NAME', 'newsportal'),
                    }
                ]
                },
                autoLoadEntities: true,
                synchronize: configService.get('APP_ENV') === 'development',
                logging: configService.get('APP_ENV') === 'development',
            }),
        }),
    ],
    providers: [SeederService],
    exports: [SeederService],
})

export class DatabaseModule {}