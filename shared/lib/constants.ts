export const APP_ROLES = ["admin", "teacher", "student", "parent"] as const;
export type AppRole = (typeof APP_ROLES)[number];

export const DEFAULT_ROLE: AppRole = "admin";

export const DEFAULT_USER_IDS: Record<AppRole, string> = {
  admin: "admin1",
  teacher: "teacher1",
  student: "student1",
  parent: "parentId1",
};
