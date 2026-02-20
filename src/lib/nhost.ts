import { NhostClient } from "@nhost/nextjs";

const backendUrl = process.env.NEXT_PUBLIC_NHOST_BACKEND_URL?.trim();
const subdomain = process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN?.trim();
const region = process.env.NEXT_PUBLIC_NHOST_REGION?.trim();

const normalizeBackendUrl = (url: string) => {
  const cleanUrl = url.replace(/\/+$/, "");
  return cleanUrl.endsWith("/v1") ? cleanUrl.slice(0, -3) : cleanUrl;
};

const createServiceUrls = (url: string) => {
  const baseUrl = normalizeBackendUrl(url);

  return {
    authUrl: `${baseUrl}/v1/auth`,
    graphqlUrl: `${baseUrl}/v1/graphql`,
    storageUrl: `${baseUrl}/v1/storage`,
    functionsUrl: `${baseUrl}/v1/functions`,
  };
};

export const isNhostConfigured = Boolean(backendUrl || (subdomain && region));

if (!isNhostConfigured && process.env.NODE_ENV !== "production") {
  // This keeps local development from crashing before env vars are wired.
  console.warn(
    "Nhost env vars missing. Add NEXT_PUBLIC_NHOST_SUBDOMAIN and NEXT_PUBLIC_NHOST_REGION in .env.local, then restart dev server.",
  );
}

export const nhost = new NhostClient(
  backendUrl
    ? createServiceUrls(backendUrl)
    : {
        subdomain: subdomain ?? "local",
        region: region,
      },
);
