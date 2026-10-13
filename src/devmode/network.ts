export interface NetworkEntry {
  id: number;
  method: string;
  url: string;
  at: number;
  duration?: number;
  status?: number;
  statusText?: string;
  contentType?: string;
  error?: string;
  requestBody?: string;
  responseBody?: string;
}

const maxEntries = 100;
const maxBody = 20000;

let entries: readonly NetworkEntry[] = [];
let nextId = 1;
let original: typeof fetch | undefined;
let recorder: typeof fetch | undefined;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function update(id: number, patch: Partial<NetworkEntry>) {
  entries = entries.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry));
  emit();
}

function clip(text: string): string {
  return text.length > maxBody
    ? `${text.slice(0, maxBody)}\n… (${text.length - maxBody} caracteres omitidos)`
    : text;
}

export function redact(body: string): string {
  try {
    return JSON.stringify(
      JSON.parse(body),
      (key, value) =>
        /token|secret|password/i.test(key) && typeof value === 'string' ? '[oculto]' : value,
      2,
    );
  } catch {
    return body;
  }
}

function describe([input, init]: Parameters<typeof fetch>) {
  const isRequest = typeof Request !== 'undefined' && input instanceof Request;
  const raw = typeof input === 'string' ? input : isRequest ? input.url : String(input);
  return {
    url: new URL(raw, window.location.href).href,
    method: (init?.method || (isRequest ? input.method : 'GET')).toUpperCase(),
    body: typeof init?.body === 'string' ? clip(redact(init.body)) : undefined,
  };
}

export function installNetworkRecorder() {
  if (typeof window === 'undefined' || recorder || typeof window.fetch !== 'function') return;
  const base = window.fetch;
  original = base;
  recorder = function recordedFetch(...args: Parameters<typeof fetch>) {
    const { url, method, body } = describe(args);
    const id = nextId++;
    const started = performance.now();
    const elapsed = () => Math.round(performance.now() - started);
    entries = [{ id, method, url, at: Date.now(), requestBody: body }, ...entries].slice(
      0,
      maxEntries,
    );
    emit();
    return base.apply(window, args).then(
      (response) => {
        update(id, {
          status: response.status,
          statusText: response.statusText,
          duration: elapsed(),
          contentType: response.headers.get('content-type') || undefined,
        });
        response
          .clone()
          .text()
          .then(
            (text) => update(id, { responseBody: clip(redact(text)) }),
            () => undefined,
          );
        return response;
      },
      (error: unknown) => {
        const aborted = error instanceof DOMException && error.name === 'AbortError';
        update(id, {
          duration: elapsed(),
          error: aborted
            ? 'Cancelada antes da resposta'
            : error instanceof Error
            ? error.message
            : 'Falha de rede',
        });
        throw error;
      },
    );
  };
  window.fetch = recorder;
}

export function uninstallNetworkRecorder() {
  if (recorder && original && window.fetch === recorder) window.fetch = original;
  recorder = undefined;
  original = undefined;
}

export function isRecording(): boolean {
  return !!recorder;
}

export function subscribeNetwork(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function networkEntries(): readonly NetworkEntry[] {
  return entries;
}

export function clearNetwork() {
  entries = [];
  emit();
}
