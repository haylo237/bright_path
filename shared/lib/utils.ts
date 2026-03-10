import "server-only";

// These exports are deprecated - use getAuthContext() from @/backend/lib/auth instead
// Kept here for backwards compatibility to avoid breaking existing imports
export const role: string = "admin";
export const currentUserId: string = "admin1";
