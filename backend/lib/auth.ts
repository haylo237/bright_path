import { cookies } from "next/headers";
import { APP_ROLES, DEFAULT_ROLE, DEFAULT_USER_IDS } from "@/shared/lib/constants";
import type { AppRole } from "@/shared/lib/constants";

// Re-export for backward compatibility
export { APP_ROLES };
export type { AppRole };

export const resolveRole = (value?: string | null): AppRole => {
  if (!value) return DEFAULT_ROLE;
  const normalized = value.toLowerCase();
  return (APP_ROLES as readonly string[]).includes(normalized)
    ? (normalized as AppRole)
    : DEFAULT_ROLE;
};

export const getDefaultUserId = (role: AppRole): string => DEFAULT_USER_IDS[role];

export const getAuthContext = async () => {
  const cookieStore = await cookies();

  const role = resolveRole(cookieStore.get("bright_path_role")?.value);
  const currentUserId =
    cookieStore.get("bright_path_user_id")?.value || getDefaultUserId(role);

  return { role, currentUserId };
};
