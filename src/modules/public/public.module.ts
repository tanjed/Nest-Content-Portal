import { Module } from "@nestjs/common";
import { ContentModule } from "./content/content.module";
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
    imports: [
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 60,
        }]),
        ContentModule]
})

export class PublicModule { }