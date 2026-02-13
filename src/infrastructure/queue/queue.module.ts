import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { QUEUE_AVAILABLE } from './queue.list';
import { QUEUE_SERVICE_INTERFACE } from './service/queue.service.interface';
import { QueueService } from './service/queue.service';
import { AttachmentServiceModule } from '../../modules/admin/attachments/service/attachment.service.module';

@Global()
@Module({
    imports: [
        AttachmentServiceModule,
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                connection: {
                    host: configService.get('REDIS_HOST'),
                    port: configService.get('REDIS_PORT'),
                },
            }),
            inject: [ConfigService],
        }),
        BullModule.registerQueue(...Object.values(QUEUE_AVAILABLE).map(queueName => ({ name: queueName }))),
    ],
    providers: [
        {
            provide: QUEUE_SERVICE_INTERFACE,
            useClass: QueueService,
        },
    ],
    exports: [
        QUEUE_SERVICE_INTERFACE,
        BullModule,
    ],
})
export class QueueModule { }