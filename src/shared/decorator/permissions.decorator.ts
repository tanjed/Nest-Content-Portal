import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export const Can = (...permissions: string[]) => SetMetadata(PERMISSIONS_KEY, permissions);
