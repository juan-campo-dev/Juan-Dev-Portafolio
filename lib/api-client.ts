/**
 * API client centralizado para hablar con el backend Laravel.
 * Configurar NEXT_PUBLIC_API_URL en .env.local en producción.
 *
 * Ejemplo:
 *   NEXT_PUBLIC_API_URL=https://juan-dev.app-dev.icu/api
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export interface ApiOptions extends RequestInit {
  /** Timeout en ms (default 10s) */
  timeout?: number;
  /** Cache de Next.js (default 'force-cache' con revalidate 60s) */
  revalidate?: number;
}

/**
 * Wrapper genérico de fetch contra la API. Devuelve JSON tipado.
 */
export async function apiFetch<T = unknown>(
  path: string,
  options: ApiOptions = {}
): Promise<T> {
  const { timeout = 10_000, revalidate = 60, ...rest } = options;

  // Si no hay API_BASE configurado todavía, lanzar error explícito
  if (!API_BASE) {
    throw new Error(
      "[api-client] NEXT_PUBLIC_API_URL no está configurada. Define la variable en .env.local."
    );
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...rest,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(rest.headers ?? {}),
      },
      next: { revalidate },
    });

    if (!res.ok) {
      throw new Error(`[api-client] ${res.status} ${res.statusText} on ${path}`);
    }

    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Helper opcional: intenta hacer fetch contra la API y si falla
 * devuelve el fallback (datos hardcodeados). Útil durante la transición.
 */
export async function apiFetchOrFallback<T>(
  path: string,
  fallback: T,
  options?: ApiOptions
): Promise<T> {
  try {
    return await apiFetch<T>(path, options);
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("[api-client] fallback used for", path, err);
    }
    return fallback;
  }
}
