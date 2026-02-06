import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from "@nestjs/common";
import { QUEUE_AVAILABLE } from './queue.list';

@Global()
@Module({
    imports: [
        BullModule.forRoot({
            connection: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT) || 6379,
            },
        }),
        BullModule.registerQueue(...Object.values(QUEUE_AVAILABLE).map(queueName => ({ name: queueName }))),
    ],
    providers: [],
})
export class QueueModule {}