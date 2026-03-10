import "server-only";

import { cookies } from "next/headers";
import { DEFAULT_USER_IDS, DEFAULT_ROLE, APP_ROLES } from "@/shared/lib/constants";
import type { AppRole } from "@/shared/lib/constants";

const resolveRole = (value?: string | null): AppRole => {
  if (!value) return DEFAULT_ROLE;
  const normalized = value.toLowerCase();
  return (APP_ROLES as readonly string[]).includes(normalized)
    ? (normalized as AppRole)
    : DEFAULT_ROLE;
};

export const getAuthContext = async () => {
  const cookieStore = await cookies();
  const role = resolveRole(cookieStore.get("bright_path_role")?.value);
  const currentUserId = cookieStore.get("bright_path_user_id")?.value || DEFAULT_USER_IDS[role];

  return { role, currentUserId };
};
