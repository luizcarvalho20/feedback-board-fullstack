const API_URL = import.meta.env.VITE_API_URL;

export async function http<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP error: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}
