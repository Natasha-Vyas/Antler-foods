import type { User } from "@nhost/nhost-js";

export type AppRole = "admin" | "manager" | "user";

const ALLOWED_ROLES = new Set<AppRole>(["admin", "manager", "user"]);

function toRole(value: unknown): AppRole | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.toLowerCase().trim();
  return ALLOWED_ROLES.has(normalized as AppRole)
    ? (normalized as AppRole)
    : null;
}

function readRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

export function getUserRole(user: User | null | undefined): AppRole {
  if (!user) {
    return "user";
  }

  const metadata = readRecord(user.metadata);
  const claims = readRecord(metadata?.claims ?? metadata?.jwtClaims);
  const hasuraClaims = readRecord(claims?.["https://hasura.io/jwt/claims"]);

  const candidates: unknown[] = [
    metadata?.role,
    metadata?.userRole,
    metadata?.["x-hasura-default-role"],
    hasuraClaims?.["x-hasura-default-role"],
    user.defaultRole,
    ...user.roles,
  ];

  for (const candidate of candidates) {
    const role = toRole(candidate);
    if (role) {
      return role;
    }
  }

  return "user";
}
