import { SetMetadata } from '@nestjs/common';

export interface SeederOptions {
  priority: number;
}
export const IS_SEEDER_KEY = 'is_seeder';
export const Seeder = (options: SeederOptions = {priority: 100}) => SetMetadata(IS_SEEDER_KEY, options);