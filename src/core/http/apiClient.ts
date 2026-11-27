import { API_URL } from '../config/env';
import { getAuthToken, notifyUnauthorized } from './authSession';

export class ApiError extends Error {
  constructor(message: string, public status: number, public data?: unknown) {
    super(message);
    this.name = 'ApiError';
  }

  get isNetworkError() {
    return this.status === 0 || this.status >= 500;
  }
}

type QueryValue = string | number | boolean | undefined | null;

export type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  query?: Record<string, QueryValue | QueryValue[]>;
  auth?: boolean;
  headers?: Record<string, string>;
};

export function buildUrl(path: string, query?: RequestOptions['query']) {
  const params: string[] = [];

  for (const [key, value] of Object.entries(query ?? {})) {
    const values = Array.isArray(value) ? value : [value];
    for (const v of values) {
      if (v === undefined || v === null) continue;
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
    }
  }

  const url = `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
  return params.length ? `${url}?${params.join('&')}` : url;
}

export async function apiRequest<T = any>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, query, auth = true, headers = {} } = options;

  const finalHeaders: Record<string, string> = { Accept: 'application/json', ...headers };
  if (auth) {
    const token = getAuthToken();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  let payload: BodyInit | undefined;
  if (body instanceof FormData) {
    payload = body;
  } else if (body !== undefined) {
    finalHeaders['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  let response: Response;
  try {
    response = await fetch(buildUrl(path, query), { method, headers: finalHeaders, body: payload });
  } catch {
    throw new ApiError('No se pudo conectar con el servidor', 0);
  }

  const data = await response.json().catch(() => null);

  if (response.status === 401 && auth) {
    notifyUnauthorized();
  }

  if (!response.ok || data?.ok === false) {
    throw new ApiError(data?.message || `Error del servidor (${response.status})`, response.status, data);
  }

  return data as T;
}

export const api = {
  get: <T = any>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'GET' }),
  post: <T = any>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'POST', body }),
  put: <T = any>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'PUT', body }),
  delete: <T = any>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'DELETE' }),
};
