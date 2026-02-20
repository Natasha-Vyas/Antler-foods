import type { AppRole } from "./get-user-role";

export const LOGIN_ROUTE = "/login";
export const SIGNUP_ROUTE = "/signup";
export const DEFAULT_AUTH_REDIRECT = "/dashboard";
export const UNAUTHORIZED_ROUTE = "/unauthorized";

export const PUBLIC_ROUTES = [LOGIN_ROUTE, SIGNUP_ROUTE] as const;
export const PROTECTED_ROUTE_PREFIXES = ["/dashboard"] as const;

export const ROLE_DASHBOARD_ROUTES: Record<AppRole, string> = {
  admin: DEFAULT_AUTH_REDIRECT,
  manager: UNAUTHORIZED_ROUTE,
  client: UNAUTHORIZED_ROUTE,
  user: UNAUTHORIZED_ROUTE,
};
