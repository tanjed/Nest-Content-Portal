import { Injectable } from "@nestjs/common";
import { DiscoveryService, Reflector } from "@nestjs/core";
import { IS_SEEDER_KEY, SeederOptions } from "./seeder/core/decorator";
import { SeederInterface } from "./seeder/core/seeder.interface";

@Injectable()
export class SeederService {
    constructor(
        private readonly discoveryService: DiscoveryService,
        private readonly reflector: Reflector,
    ) {}


    async run() {
        const providers = this.discoveryService.getProviders({metadataKey: IS_SEEDER_KEY});

        const seeders = providers
        .filter((wrapper) => {
            const { metatype, instance } = wrapper;
            return instance && metatype && this.reflector.get(IS_SEEDER_KEY, metatype);
        })
        .map((wrapper) => {
           
            const metadata = this.reflector.get<SeederOptions>(IS_SEEDER_KEY, wrapper.metatype!);
            return {
                instance: wrapper.instance as SeederInterface,
                priority: metadata?.priority ?? 100,
            };
        })
        .sort((a, b) => a.priority - b.priority);

        for (const seeder of seeders) {
            console.log(`Running seeder: ${seeder.constructor.name}`);
            await seeder.instance.seed();
        }
    }
}