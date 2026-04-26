/**
 * Tracking de eventos hacia el backend Laravel + MongoDB.
 *
 * Eventos soportados:
 *   - page_view       (al cargar el portafolio)
 *   - project_view    (al abrir el modal de un proyecto)
 *   - click_github    (al hacer click en GitHub)
 *   - click_demo      (al hacer click en Demo)
 *
 * Estructura enviada (el backend hashea la IP server-side con SHA256+salt):
 *   { type, project_slug?, path?, referrer, user_agent, created_at }
 *
 * Throttle client-side: 1 evento por (type, project_slug) por hora usando localStorage.
 * El backend además aplica rate-limit por IP.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
const THROTTLE_MS = 60 * 60 * 1000; // 1 hora
const STORAGE_PREFIX = "track::";

export type EventType =
  | "page_view"
  | "project_view"
  | "click_github"
  | "click_demo"
  | "contact_click";

export interface TrackPayload {
  type: EventType;
  project_slug?: string;
  path?: string;
}

/**
 * Registra un evento. Es fire-and-forget: si la API falla, no rompe la UI.
 *
 * El envío se difiere a `requestIdleCallback` (o un microtask) para que el
 * tracking nunca compita con render/scroll. Si llegan varios eventos seguidos
 * dentro del mismo idle window, se procesan en orden sin bloquear el frame.
 */
const queue: Array<{ key: string; body: Record<string, unknown> }> = [];
let flushScheduled = false;

const flush = async () => {
  flushScheduled = false;
  while (queue.length) {
    const item = queue.shift();
    if (!item) break;
    try {
      await fetch(`${API_BASE}/track-event`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify(item.body),
      });
      window.localStorage.setItem(item.key, String(Date.now()));
    } catch {
      // Silencioso por diseño — tracking nunca debe romper UX
    }
  }
};

const scheduleFlush = () => {
  if (flushScheduled) return;
  flushScheduled = true;
  const ric = (window as unknown as {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  }).requestIdleCallback;
  if (ric) {
    ric(flush, { timeout: 2000 });
  } else {
    window.setTimeout(flush, 0);
  }
};

export function track(payload: TrackPayload): void {
  if (typeof window === "undefined") return;
  if (!API_BASE) return; // backend aún no configurado → no-op silencioso

  // Throttle local
  const key = `${STORAGE_PREFIX}${payload.type}::${payload.project_slug ?? payload.path ?? ""}`;
  const last = Number(window.localStorage.getItem(key) ?? 0);
  const now = Date.now();
  if (now - last < THROTTLE_MS) return;
  // Marca optimista para evitar duplicados si el usuario dispara el mismo
  // evento dos veces antes del flush.
  window.localStorage.setItem(key, String(now));

  queue.push({
    key,
    body: {
      ...payload,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    },
  });
  scheduleFlush();
}

/** Helpers de conveniencia */
export const trackPageView = (path: string) => track({ type: "page_view", path });
export const trackProjectView = (slug: string) =>
  track({ type: "project_view", project_slug: slug });
export const trackGithubClick = (slug: string) =>
  track({ type: "click_github", project_slug: slug });
export const trackDemoClick = (slug: string) =>
  track({ type: "click_demo", project_slug: slug });
