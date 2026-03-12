import { API_TIMEOUT } from '@/lib/constants/api.constants';

/**
 * Fetch wrapper with timeout support for external microservice calls.
 * Prevents requests from hanging indefinitely when services are cold-starting or down.
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = API_TIMEOUT.DEFAULT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  // Combine caller's signal (if any) with our timeout signal
  const signal = options.signal
    ? AbortSignal.any([controller.signal, options.signal])
    : controller.signal;

  try {
    return await fetch(url, {
      ...options,
      signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(
        `El servicio no respondió en ${Math.round(timeoutMs / 1000)} segundos. Intenta de nuevo en unos momentos.`
      );
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
