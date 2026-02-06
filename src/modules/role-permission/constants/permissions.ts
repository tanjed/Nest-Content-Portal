
export const PERMISSIONS = {
  // Content Management
  CONTENT: {
    VIEW: 'content.view',
    CREATE: 'content.create',
    UPDATE: 'content.update',
    DELETE: 'content.delete',
    PUBLISH: 'content.publish',
  },

  // Category Management
  CATEGORY: {
    VIEW: 'category.view',
    CREATE: 'category.create',
    UPDATE: 'category.update',
    DELETE: 'category.delete',
  },

  // User Management
  USER: {
    VIEW: 'user.view',
    CREATE: 'user.create',
    UPDATE: 'user.update',
    DELETE: 'user.delete',
    MANAGE_ROLES: 'user.manage_roles',
  },

  // Role & Permission Management
  ROLE: {
    VIEW: 'role.view',
    CREATE: 'role.create',
    UPDATE: 'role.update',
    DELETE: 'role.delete',
    ASSIGN: 'role.assign',
  },

  // Media/Attachments
  MEDIA: {
    UPLOAD: 'media.upload',
    DELETE: 'media.delete',
  },
} as const;

// Flat array of all permission names (for seeder)
export const ALL_PERMISSIONS = Object.values(PERMISSIONS).flatMap(group =>
  Object.values(group)
);
