import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DiscoveryModule } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeederModule } from "./seeder/seeder.module";
@Module({
    imports: [
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
        DiscoveryModule,
        SeederModule,
    ],
    providers: [],
    exports: [],
})

export class DatabaseModule {}