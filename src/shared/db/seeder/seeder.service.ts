import { Injectable } from "@nestjs/common";
import { DiscoveryService, Reflector } from "@nestjs/core";
import { IS_SEEDER_KEY, SeederOptions } from "./core/decorator";
import { SeederInterface } from "./core/seeder.interface";

@Injectable()
export class SeederService {
    constructor(
        private readonly discoveryService: DiscoveryService,
        private readonly reflector: Reflector,
    ) { }

    async run() {
        // Get all providers and filter by metadata manually
        const allProviders = this.discoveryService.getProviders();

        const seeders = allProviders
            .filter((wrapper) => {
                const { metatype, instance } = wrapper;
                if (!instance || !metatype) return false;
                return this.reflector.get(IS_SEEDER_KEY, metatype) !== undefined;
            })
            .map((wrapper) => {
                const metadata = this.reflector.get<SeederOptions>(IS_SEEDER_KEY, wrapper.metatype!);
                return {
                    instance: wrapper.instance as SeederInterface,
                    priority: metadata?.priority ?? 100,
                    name: wrapper.metatype?.name || 'Unknown',
                };
            })
            .sort((a, b) => a.priority - b.priority);

        console.log(`Found ${seeders.length} seeders`);

        for (const seeder of seeders) {
            console.log(`Running seeder: ${seeder.name}`);
            await seeder.instance.seed();
        }

        console.log('Seeding completed!');
    }
}